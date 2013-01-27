using System;
using CommonLibraries;
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
            new ArrayUtils();
            childProcess = Global.Require<ChildProcess>("child_process");
            gameServerIndex = "GameServer" + Guid.NewGuid();
            Global.Require<NodeModule>("fibers");
            Global.Process.On("exit", () => Console.Log("exi"));

            GameManager gameManager = new GameManager(gameServerIndex);
             
        }

        public static void Main()
        {
            try {
                new GameServer();
            } catch (Exception exc) {
                Console.Log("CRITICAL FAILURE: " + exc.GoodMessage());
            }
        }
    }
}