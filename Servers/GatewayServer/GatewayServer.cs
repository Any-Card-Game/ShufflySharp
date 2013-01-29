using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using NodeJSLibrary;
using SocketIONodeLibrary;
namespace GatewayServer
{
    public class GatewayServer
    {
        private PubSub ps;
        public JsDictionary<string, UserSocketModel> users = new JsDictionary<string, UserSocketModel>();

        public GatewayServer()
        {
            //ExtensionMethods.debugger("");
            var http = Global.Require<Http>("http");
            var app = http.CreateServer((req, res) => res.End());

            var io = Global.Require<SocketIO>("socket.io").Listen(app);
            var fs = Global.Require<FS>("fs");
            QueueManager queueManager;
            var port = 1800 + Math.Truncate((int) ( Math.Random() * 4000 ));

            app.Listen(port);
            io.Set("log level", 0);
            var myName = "Gateway " + Guid.NewGuid();

            ps = new PubSub(() => {
                                ps.Subscribe<string>("PUBSUB.GatewayServers.Ping",
                                                     message =>
                                                     ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port)));
                                ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port));
                            });

            queueManager = new QueueManager(myName,
                                            new QueueManagerOptions(new[] {
                                                                                  new QueueWatcher("GatewayServer", messageReceived),
                                                                                  new QueueWatcher(myName, messageReceived)
                                                                          },
                                                                    new[] {
                                                                                  "SiteServer",
                                                                                  "GameServer*",
                                                                                  "DebugServer",
                                                                                  "ChatServer",
                                                                                  "HeadServer"
                                                                          }));
            io.Sockets.On("connection",
                          (SocketIOConnection socket) => {
                              UserSocketModel user = null;
                              socket.On("Gateway.Message",
                                        (GatewayMessageModel data) => {
                                            if (user == null)
                                                return;
                                            var channel = "Bad";
                                            switch (data.Channel.Split('.')[1]) {
                                                case "Game":
                                                    channel = "GameServer";
                                                    break;
                                                case "Site":
                                                    channel = "SiteServer";
                                                    break;
                                                case "Debug":
                                                    channel = "GameServer";
                                                    break;
                                                case "Debug2":
                                                    channel = "DebugServer";
                                                    break;
                                                case "Chat":
                                                    channel = "ChatServer";
                                                    break;
                                            }
                                            queueManager.SendMessage(user.ToUserModel(),
                                                                     data.GameServer ?? channel,
                                                                     data.Channel,
                                                                     data.Content);
                                        });

                              socket.On("Gateway.Login",
                                        (GatewayLoginMessageModel data) => {
                                            user = new UserSocketModel();
                                            user.Password = data.Password;
                                            user.Socket = socket;
                                            user.UserName = data.UserName;
                                            user.Hash = data.UserName;
                                            users[data.UserName] = user;
                                            sendMessage(user, "Area.Main.Login.Response", new UserLoginResponse(true, user.ToUserModel()), user.ToUserModel());
                                        });
                              socket.On("disconnect",
                                        (string data) => {
                                            if (user == null)
                                                return;
                                            queueManager.SendMessage(user.ToUserModel(), "SiteServer", "Area.Site.UserDisconnect", new UserDisconnectModel(user.ToUserModel()));
                                            queueManager.SendMessage(user.ToUserModel(), "GameServer", "Area.Game.UserDisconnect", new UserDisconnectModel(user.ToUserModel()));

                                            users.Remove(user.UserName);
                                        });
                          });
        }

        public static void Main()
        {
            try {
                new GatewayServer();
            } catch (Exception exc) {
                Console.Log("CRITICAL FAILURE: " + exc.GoodMessage());
            }
        }

        private void messageReceived(string gateway, UserModel user, string eventChannel, object content)
        {
            if (users.ContainsKey(user.UserName)) {
                var u = users[user.UserName];
                sendMessage(u, eventChannel, content, user);
            }
        }

        private static void sendMessage(UserSocketModel user, string eventChannel, object content, UserModel u)
        {
            user.Socket.Emit("Client.Message", new SocketClientMessageModel(u, eventChannel, content));
        }
    }
}