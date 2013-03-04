using System;
using CommonLibraries;
using CommonServerLibraries;
using CommonShuffleLibrary;
using Models.GameManagerModels;
using NodeJSLibrary;
namespace DebugServer
{
    public class DebugServer
    {
        public DebugServer()
        {
            Logger.Start("Debug1");

            var fs = Global.Require<FS>("fs");

            var queueManager = new QueueManager("Debug1",
                                                new QueueManagerOptions(new[] {
                                                                                      new QueueWatcher("DebugServer", null),
                                                                              },
                                                                        new[] {"GatewayServer", "Gateway*"}));

            queueManager.AddChannel("Area.Debug2.GetGameSource.Request",
                                    (sender, data) => {
                                        var sourceRequest = (GameSourceRequestModel) data;
                                        fs.ReadFile(ExtensionMethods.HARDLOCATION+"Games/" + sourceRequest.GameName + "/app.js",
                                                    "ascii",
                                                    (err, data2) => { queueManager.SendMessage(sender.Gateway, "Area.Debug.GetGameSource.Response", sender, new GameSourceResponseModel(data2)); });
                                    });
        }

        public static void Main()
        {
            try {
                new DebugServer();
            } catch (Exception exc) {
                Logger.Log("CRITICAL FAILURE: " + exc.GoodMessage(), LogLevel.Error);
            }
        }
    }
}