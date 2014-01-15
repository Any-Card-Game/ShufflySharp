using System;
using CommonLibraries;
using CommonShuffleLibrary;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;

namespace ServerManager.DebugGameServer
{
    public class DebugGameServer
    {
        private ChildProcess childProcess;
        private string debugServerIndex;

        public DebugGameServer()
        {
            debugServerIndex = "DebugServer" + Guid.NewGuid();
            ServerLogger.InitLogger("DebugServer", debugServerIndex);
            Logger.Start(debugServerIndex);
            
            childProcess = Global.Require<ChildProcess>("child_process");
            Global.Scope.Fiber= Global.Require<NodeModule>("fibers");
            Global.Process.On("exit", () => ServerLogger.LogError("exi", null));

            DebugGameManager debugGameManager = new DebugGameManager(debugServerIndex);
        }

 
    }
}