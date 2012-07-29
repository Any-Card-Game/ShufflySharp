using System;
using System.Collections.Generic;
using System.Text;
using CommonShuffleLibraries;
using NodeJSLibrary;

namespace DebugServer
{
    public class DebugServer
    {
        public DebugServer()
        {

            var fs = Global.Require<FS>("fs");

            var queueManager = new QueueManager("Debug1", new QueueManagerOptions(new QueueWatcher[]
                {
                    new QueueWatcher("DebugServer",null), 
                }, new[] { "GatewayServer", "Gateway*" }));

            queueManager.AddChannel<dynamic>("Area.Debug2.GetGameSource.Request", (sender, d) =>
                {
                    var data = (dynamic)d;
                    Action<FileSystemError, object> m = (err, data2) =>
                        {
                            queueManager.SendMessage(sender, sender.Gateway, "Area.Debug.GetGameSource.Response", data2.ToString());
                        };

                    fs.ReadFile("/usr/local/src/games/" + data.gameName + "/app.js", m);
                });
        }
    }
}
