using System;
using System.Collections;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using NodeJSLibrary;
namespace HeadServer
{
    public class HeadServer
    {
        private string __dirname = "/usr/local/src/new";
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
            qManager = new QueueManager("Head1",
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("HeadServer", null),
                                                                              new QueueWatcher("Head1", null),
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

            Global.SetInterval(pollGateways, 1000);
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
            Global.Require<Http>("http").CreateServer(handler).Listen(80);
        }

        public static void Main()
        {
            try {
                new HeadServer();
            } catch (Exception exc) {
                Console.Log("CRITICAL FAILURE: " + exc.GoodMessage());
            }
        }
    }
}