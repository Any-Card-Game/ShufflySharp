using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models; 
using Models.SiteManagerModels;
using NodeJSLibrary;
using SocketIONodeLibrary;
namespace GatewayServer
{
    public class GatewayServer
    {
        private string myGatewayName;
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
            myGatewayName = "Gateway " + Guid.NewGuid();

            ps = new PubSub(() => {
                                ps.Subscribe<string>("PUBSUB.GatewayServers.Ping",
                                                     message =>
                                                     ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port)));
                                ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port));
                            });

            queueManager = new QueueManager(myGatewayName,
                                            new QueueManagerOptions(new[] {
                                                                                  new QueueWatcher("GatewayServer", messageReceived),
                                                                                  new QueueWatcher(myGatewayName, messageReceived)
                                                                          },
                                                                    new[] {
                                                                                  "SiteServer",
                                                                                  "GameServer*",
                                                                                  "GameServer",
                                                                                  "DebugServer",
                                                                                  "ChatServer",
                                                                                  "ChatServer*",
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
                                                    channel = user.CurrentGameServer ?? "GameServer";
                                                    break;
                                                case "Site":
                                                    channel = "SiteServer";
                                                    break;
                                                case "Debug":
                                                    channel = user.CurrentGameServer ?? "GameServer";
                                                    break;
                                                case "Debug2":
                                                    channel = "DebugServer";
                                                    break;
                                                case "Chat":
                                                    channel = user.CurrentChatServer ?? "ChatServer";
                                                    break;
                                            }
                                            queueManager.SendMessage(channel,
                                                                     data.Channel, user.ToLogicModel(), data.Content);
                                        });

                              socket.On("Gateway.Login",
                                        (GatewayLoginMessageModel data) => {
                                            ExtensionMethods.debugger();
                                            user = new UserSocketModel();
                                            user.Password = data.Password;
                                            user.Socket = socket;
                                            user.UserName = data.UserName;
                                            user.Hash = data.UserName;
                                            user.Gateway = myGatewayName;
                                            users[data.UserName] = user;
                                            queueManager.SendMessage("SiteServer",
                                                                     "Area.Site.Login", user.ToLogicModel(), new SiteLoginRequest(user.Hash));
                                        });
                              socket.On("disconnect",
                                        (string data) => {
                                            if (user == null)
                                                return;
                                            queueManager.SendMessage("SiteServer", "Area.Site.UserDisconnect", user.ToLogicModel(), new UserDisconnectModel(user.ToLogicModel()));
                                            //disconnecting from the room in site server disconencts from chat..
                                            // if (user.CurrentChatServer != null)
                                            //     queueManager.SendMessage(user.ToLogicModel(), user.CurrentChatServer, "Area.Chat.UserDisconnect", new UserDisconnectModel(user.ToLogicModel()));
                                            if (user.CurrentGameServer != null)
                                                queueManager.SendMessage(user.CurrentGameServer, "Area.Game.UserDisconnect", user.ToLogicModel(), new UserDisconnectModel(user.ToLogicModel()));

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

        private void messageReceived(string gateway, UserLogicModel user, string eventChannel, object content)
        {
            if (users.ContainsKey(user.UserName)) {
                var u = users[user.UserName];

                sendMessage(u, eventChannel, content);
            }
        }

        private void sendMessage(UserSocketModel user, string eventChannel, object content)
        {
            if (specialHandle(user, eventChannel, content))
                user.Socket.Emit("Client.Message", new SocketClientMessageModel(user.ToUserModel(), eventChannel, content));
        }

        private bool specialHandle(UserSocketModel user, string eventChannel, object content)
        {
          
            if (eventChannel == "Area.Chat.RegisterServer") {
                Console.Log(string.Format("Chat Server {0} Registered to {1}", ( (RegisterServerModel) content ).Server, user.Hash));
                user.CurrentChatServer = ( (RegisterServerModel) content ).Server;
                return false;
            }
            if (eventChannel == "Area.Chat.UnregisterServer") {
                Console.Log("Chat Server UnRegistered");

                user.CurrentChatServer = null;
                return false;
            }
            if (eventChannel == "Area.Game.RegisterServer") {
                Console.Log(string.Format("Game Server {0} Registered to {1}", ( (RegisterServerModel) content ).Server, user.Hash));
                user.CurrentGameServer = ( (RegisterServerModel) content ).Server;
                return false;
            }
            if (eventChannel == "Area.Game.UnregisterServer") {
                Console.Log("Game Server UnRegistered");
                user.CurrentGameServer = null;
                return false;
            }
            return true;
        }
    }
}