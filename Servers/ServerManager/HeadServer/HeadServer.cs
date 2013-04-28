using System;
using System.Collections;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
namespace ServerManager.HeadServer
{
    public class HeadServer
    {
        private string __dirname = IPs.HARDLOCATION;
        private FS fs = Global.Require<FS>("fs");
        private List<string> gateways = new List<string>();
        private List<string> indexForSites = new List<string>();
        private string indexPageData;
        private List<string> oldGateways = new List<string>();
        private List<string> oldIndex = new List<string>();
        private PubSub pubsub;
        private QueueManager qManager;
        private int siteIndex;

        public HeadServer()
        {
            var name = "Head1";
            Logger.Start(name);

            qManager = new QueueManager(name,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("HeadServer", null),
                                                                              new QueueWatcher(name, null),
                                                                      },
                                                                new[] {
                                                                              "GatewayServer"
                                                                      }));

            fs.ReadFile(__dirname + "/index.html", "ascii", ready);

            pubsub = new PubSub(() => pubsub.Subscribe<string>("PUBSUB.GatewayServers",
                                                               message => {
                                                                   indexForSites.Add(indexPageData.Replace("{{gateway}}", message));
                                                                   gateways.Add(message);
                                                               }));

            Global.Require<Http>("http").CreateServer(handlerWS).Listen(8844);

            Global.SetInterval(pollGateways, 5000);
            pollGateways();
        }

        private void pollGateways()
        {
            pubsub.Publish("PUBSUB.GatewayServers.Ping", "");

            if (indexForSites.Count > 0)
                oldIndex = indexForSites;
            if (gateways.Count > 0)
                oldGateways = gateways;
            indexForSites = new List<string>();
            gateways = new List<string>();
            siteIndex = 0;
        }

        private void handlerWS(HttpRequest request, HttpResponse response)
        {
            if (oldGateways.Count > 0) {
                var inj = ( siteIndex++ ) % oldIndex.Count;
                response.End(oldGateways[inj]);
                return;
            }
            response.End();
        }

        private void handler(HttpRequest request, HttpResponse response)
        {
            var dict = new JsDictionary();
            dict["Content-Type"] = "text/html";
            if (oldIndex.Count > 0) {
                response.WriteHead(200, dict);
                var inj = ( siteIndex++ ) % oldIndex.Count;
                response.End(oldIndex[inj]);
            } else {
                response.WriteHead(200, dict);
                response.End();
            }
        }

        public void ready(FileSystemError error, object content)
        {
            indexPageData = content.ToString();
            indexPageData = content.ToString();
            Global.Require<Http>("http").CreateServer(handler).Listen(80);
        }

     }
}