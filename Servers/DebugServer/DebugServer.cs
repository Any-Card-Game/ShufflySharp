﻿using CommonShuffleLibrary;
using Models;
using NodeJSLibrary;

namespace DebugServer
{
    public class DebugServer
    {
        public DebugServer()
        {
            var fs = Global.Require<FS>("fs");

            var queueManager = new QueueManager("Debug1", new QueueManagerOptions(new[]
                {
                    new QueueWatcher("DebugServer", null),
                }, new[] {"GatewayServer", "Gateway*"}));

            queueManager.AddChannel<GameSourceRequestModel>("Area.Debug2.GetGameSource.Request",
                                                            (sender, data) =>
                                                                {
                                                                    fs.ReadFile("/usr/local/src/new/Games/" + data.GameName + "/app.js", "ascii",
                                                                                (err, data2) => { queueManager.SendMessage(sender, sender.Gateway, "Area.Debug.GetGameSource.Response", new GameSourceResponseModel(data2)); });
                                                                });
        }
    }
}