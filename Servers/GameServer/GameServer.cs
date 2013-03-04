using System;
using CommonLibraries;
using CommonServerLibraries;
using NodeJSLibrary;
using global;
namespace GameServer
{
    public class GameServer
    {
        private ChildProcess childProcess;
        private string gameServerIndex;

        public GameServer()
        {
            gameServerIndex = "GameServer" + Guid.NewGuid();
            Logger.Start(gameServerIndex);
            
            new ArrayUtils();
            childProcess = Global.Require<ChildProcess>("child_process");
            Global.Scope.Fiber= Global.Require<NodeModule>("fibers");
            Global.Process.On("exit", () => Logger.Log("exi", LogLevel.Information));

            GameManager gameManager = new GameManager(gameServerIndex);
        }

        public static void Main()
        {
            try {
                new GameServer();
            } catch (Exception exc) {
                Logger.Log("CRITICAL FAILURE: " + exc.GoodMessage(), LogLevel.Error);
            }
        }
    }
}