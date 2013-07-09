using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
using NodeLibraries.Common.Charm;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using NodeLibraries.SocketIONode;
namespace ServerManager.GatewayServer
{
    public class GatewayServer
    {
        private string myGatewayName;
        private PubSub ps;
        private JsDictionary<string, UserSocketModel> users = new JsDictionary<string, UserSocketModel>();
        int curc = 0;

        public GatewayServer()
        {
            myGatewayName = "Gateway " + Guid.NewGuid();
            /*

                        var charm = Charmer.Setup();

                        var prog = new ProgressBar(charm, 0, 100) {X = 5, Y = 5, Width = 10, CurValue = 12};

                        Global.SetInterval(() => {
                                               prog.CurValue++; 
                                           },200);
            */


            Logger.Start(myGatewayName);

            //ExtensionMethods.debugger("");
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            var io = Global.Require<SocketIO>("socket.io").Listen(app);
            var fs = Global.Require<FS>("fs");
            QueueManager queueManager;
            var port = 1800 + Math.Truncate((Math.Random() * 4000d));
            port = 1800;
            string currentSubdomain = "gateway1";
            string currentIP = ServerHelper.GetNetworkIPs()[0] + ":" + port;
            string content;
            if (Constants.Local)
                content = string.Format("http://{0}", currentIP);
            else
                content = string.Format("http://{0}.{1}", currentSubdomain, "anycardgame.com");

            Logger.Log(content,LogLevel.Information);
            app.Listen(port);
            io.Set("log level", 0);

            Global.SetInterval(() => Logger.Log(string.Format("Wooooww {0}'s still alive.", myGatewayName), LogLevel.Information), 10000);
            ps = new PubSub(() =>
                            {
                               

                                ps.Subscribe<string>("PUBSUB.GatewayServers.Ping",
                                                     message =>
                                                     {
                                                         ps.Publish("PUBSUB.GatewayServers", content);

                                                         //                          ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", currentIP, port));
                                                     });
                                //                                ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", currentIP, port));
                                ps.Publish("PUBSUB.GatewayServers", content);
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
                          (SocketIOConnection socket) =>
                          {
                              var j = ++curc;
                              Console.Log("Socket Connected " + j);
                              UserSocketModel user = null;
                              socket.On("Gateway.Message",
                                        (GatewayMessageModel data) =>
                                        {
                                            if (user == null)
                                                return;
                                            Console.Log("Socket message " + j + "  " + user.UserName);

                                            var channel = "Bad";
                                            switch (data.Channel.Split('.')[1])
                                            {
                                                case "Game":
                                                    channel = user.CurrentGameServer ?? "GameServer";
                                                    break;
                                                case "Site":
                                                    channel = "SiteServer";
                                                    break;
                                                case "Debug":
                                                    channel = user.CurrentDebugServer ?? "DebugServer";
                                                    break; 
                                                case "Chat":
                                                    channel = user.CurrentChatServer ?? "ChatServer";
                                                    break;
                                            }
                                            queueManager.SendMessage(channel, data.Channel, user.ToLogicModel(), data.Content);
                                        });

                              socket.On("Gateway.Login",
                                        (GatewayLoginMessageModel data) =>
                                        {
                                            //ExtensionMethods.debugger();
                                            user = new UserSocketModel();
                                            user.Password = data.Password;
                                            user.Socket = socket;
                                            user.UserName = data.UserName;
                                            user.Hash = data.UserName;
                                            user.Gateway = myGatewayName;

                                            Console.Log("Socket login " + j + "  " + user.ToString());

                                            users[data.UserName] = user;
                                            queueManager.SendMessage("SiteServer", "Area.Site.Login", user.ToLogicModel(), new SiteLoginRequest(user.Hash));
                                        });
                              socket.On("disconnect",
                                        (string data) =>
                                        {
                                            if (user == null)
                                                return;
                                            Console.Log("Socket left " + j + "  " + user.UserName);

                                            queueManager.SendMessage("SiteServer", "Area.Site.UserDisconnect", user.ToLogicModel(), new UserDisconnectModel(user.ToLogicModel()));
                                            //disconnecting from the room in site server disconencts from chat..
                                            // if (user.CurrentChatServer != null)
                                            //     queueManager.SendMessage(user.ToLogicModel(), user.CurrentChatServer, "Area.Chat.UserDisconnect", new UserDisconnectModel(user.ToLogicModel()));
                                            if (user.CurrentGameServer != null)
                                                queueManager.SendMessage(user.CurrentGameServer, "Area.Game.UserDisconnect", user.ToLogicModel(), new UserDisconnectModel(user.ToLogicModel()));

                                            users.Remove(user.UserName);
                                            socket.RemoveAllListeners();
                                            //socket.Delete();
                                            io.Sockets.Sockets.Remove(socket.ID);
                                            curc--;
                                        });
                          });
        }


        private void messageReceived(string gateway, UserLogicModel user, string eventChannel, object content)
        {
            if (users.ContainsKey(user.UserName))
            {
                var u = users[user.UserName];

                sendMessage(u, eventChannel, content);
            }
        }

        private void sendMessage(UserSocketModel user, string eventChannel, object content)
        {
            if (specialHandle(user, eventChannel, content))
            {
                var socketClientMessageModel = new SocketClientMessageModel(user.ToUserModel(), eventChannel, content);
                Logger.Log(socketClientMessageModel.ToString(), LogLevel.Information);
                user.Socket.Emit("Client.Message", socketClientMessageModel);
            }
        }

        private bool specialHandle(UserSocketModel user, string eventChannel, object content)
        {

            if (eventChannel == "Area.Chat.RegisterServer")
            {
                Logger.Log(string.Format("Chat Server {0} Registered to {1}", ((RegisterServerModel)content).Server, user.Hash), LogLevel.Information);
                user.CurrentChatServer = ((RegisterServerModel)content).Server;
                return false;
            }
            if (eventChannel == "Area.Chat.UnregisterServer")
            {
                Logger.Log("Chat Server UnRegistered", LogLevel.Information);

                user.CurrentChatServer = null;
                return false;
            }
            if (eventChannel == "Area.Game.RegisterServer")
            {
                Logger.Log(string.Format("Game Server {0} Registered to {1}", ((RegisterServerModel)content).Server, user.Hash), LogLevel.Information);
                user.CurrentGameServer = ((RegisterServerModel)content).Server;
                return false;
            }
            if (eventChannel == "Area.Game.UnregisterServer")
            {
                Logger.Log("Game Server UnRegistered", LogLevel.Information);
                user.CurrentGameServer = null;
                return false;
            }

            if (eventChannel == "Area.Debug.RegisterServer")
            {
                Logger.Log(string.Format("Debug Server {0} Registered to {1}", ((RegisterServerModel)content).Server, user.Hash), LogLevel.Information);
                user.CurrentDebugServer= ((RegisterServerModel)content).Server;
                return false;
            }
            if (eventChannel == "Area.Debug.UnregisterServer")
            {
                Logger.Log("Debug Server UnRegistered", LogLevel.Information);
                user.CurrentDebugServer = null;
                return false;
            }
            return true;
        }
    }
}