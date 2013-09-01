using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using NodeLibraries.SocketIONode;
namespace ServerManager.MonitorServer
{
    public class MonitorServer
    {
        public JsDictionary<string, UserSocketModel> users = new JsDictionary<string, UserSocketModel>();

        public MonitorServer()
        {

            //ExtensionMethods.debugger("");
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            var io = Global.Require<SocketIO>("socket.io").Listen(app);
            var fs = Global.Require<FS>("fs");
            QueueManager queueManager;
            var port = 9991 ;

            string currentIP = ServerHelper.GetNetworkIPs()[0];
            Console.WriteLine(currentIP); 

            app.Listen(port);
            io.Set("log level", 0);
            string[] serverTypes = { "DebugServer", "AdminServer", "SiteServer", "GameServer", "ChatServer", "GatewayServer", "HeadServer" };
            List<SocketIOConnection> connections = new List<SocketIOConnection>();

            foreach (var serverType in serverTypes)
            {
                new ServerLogListener(serverType, (mess) =>
                                                              {
                                                                  foreach (var socketIoConnection in connections)
                                                                  {
                                                                      socketIoConnection.Emit(mess.ServerType, mess);
                                                                  }
                                                              });

            }
             io.Sockets.On("connection",
                          (SocketIOConnection socket) =>
                          {
                              connections.Add(socket);
                              socket.On("Gateway.Message",
                                        (GatewayMessageModel data) =>
                                        {

                                        });
                              socket.On("disconnect",
                                        (string data) =>
                                        {
                                            connections.Remove(socket);

                                        });
                          });
        }


    }
}