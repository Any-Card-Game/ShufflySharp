using System;
using CommonLibraries;
using CommonShuffleLibrary;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using global;
namespace ServerManager.GameServer
{
    public class GameServer
    {
        private ChildProcess childProcess;
        private string gameServerIndex;

        public GameServer()
        {
            gameServerIndex = "GameServer" + Guid.NewGuid();
            ServerLogger.InitLogger("GameServer", gameServerIndex);
            Logger.Start(gameServerIndex);

            childProcess = Global.Require<ChildProcess>("child_process");
            Global.Scope.Fiber = Global.Require<NodeModule>("fibers");
            Global.Process.On("exit", () => ServerLogger.Log("exi", LogLevel.Information));

            GameManager gameManager = new GameManager(gameServerIndex);
        }


    }
}