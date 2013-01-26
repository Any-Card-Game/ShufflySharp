using System.Collections.Generic;
using CommonLibraries;
using NodeJSLibrary;
using global;
namespace GameServer
{
    public class GameServer
    {
        private ChildProcess childProcess;
        private string gameServerIndex;

        public static void Main()
        {
            new GameServer();
        }

        public GameServer()
        {
            new ArrayUtils(); 
            childProcess = Global.Require<ChildProcess>("child_process");
            gameServerIndex = "GameServer" + Guid.NewGuid();
            Global.Require<NodeModule>("fibers");
            Global.Process.On("exit", () => Console.Log("exi"));

            GameManager gameManager = new GameManager(gameServerIndex);

            /*qManager.AddChannel("Area.Game.Create", (arg1, arg2) =>
                {
                    GameRoom room;
                    rooms.Add(room = new GameRoom());
                });*/


        } 
    }
}