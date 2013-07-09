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
            var port = 1800 + Math.Truncate( (Math.Random() * 4000d));

            string currentIP = ServerHelper.GetNetworkIPs()[0];
            Console.Log(currentIP);
            app.Listen(port);
            io.Set("log level", 0);
             

     
            io.Sockets.On("connection",
                          (SocketIOConnection socket) =>
                          {
                              UserSocketModel user = null;
                              socket.On("Gateway.Message",
                                        (GatewayMessageModel data) =>
                                        {
                                         }); 
                              socket.On("disconnect",
                                        (string data) =>
                                        {
                                         });
                          });
        }
 
         
    }
}