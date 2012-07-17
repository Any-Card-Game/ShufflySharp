using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Serialization;
using Fibers;
using NodeJS;
using ShufflyGame;
using ShufflyNode.Common;
using ShufflyNode.Libs;

namespace ShufflyNode.GameServer
{
    public class GameServer
    {
        private QueueManager qManager;
        private bool verbose = false;
        private GameData gameData;
        private List<GameRoom> rooms;
        private Date startTime;
        private Dictionary<string, GameObject> cachedGames;
        private Shuff requiredShuff;

        public GameServer()
        {

            Global.Require<NodeModule>("Help");
            FS fs = Global.Require<FS>("fs");
            ChildProcess childProcess = Global.Require<ChildProcess>("child_process");

            DataManager dataManager = new DataManager();
            string gameServerIndex = "GameServer" + Guid.NewGuid();
            cachedGames = new Dictionary<string, GameObject>();

            requiredShuff = Global.Require<Shuff>("./../gameFramework/shuff.js");



            qManager = new QueueManager(gameServerIndex, new QueueManagerOptions(new QueueWatcher[]
                                                                                     {
                                                                                         new QueueWatcher("GameServer", null),
                                                                                         new QueueWatcher(gameServerIndex, null),
                                                                                     }, new string[]
                                                                                            {
                                                                                                "GameServer",
                                                                                                "GatewayServer",
                                                                                                "Gateway*"
                                                                                            }));


            Global.Require<NodeModule>("fibers");
            rooms = new List<GameRoom>();

            gameData = new GameData();

            Global.Process.On("exit", delegate { Global.Console.Log("exi"); });


            qManager.AddChannel<int>("Area.Game.Create", delegate
                                                             {
                                                                 GameRoom room;
                                                                 rooms.Add(room = new GameRoom());
                                                             });

            qManager.AddChannel<CreateGameRequest>("Area.Debug.Create",
                                     delegate(User user, object arg2)
                                     {
                                         CreateGameRequest data = (CreateGameRequest)arg2;
                                         GameRoom room;
                                         rooms.Add(room = new GameRoom());
                                         room.Name = data.Name;
                                         room.MaxUsers = 6;
                                         room.Debuggable = true;
                                         room.GameName = data.GameName;
                                         room.RoomID = Guid.NewGuid();
                                         room.Answers = new List<int>();
                                         room.Players = new List<User>();
                                         room.Started = false;
                                         room.GameServer = gameServerIndex;
                                         room.Players.Add(user);

                                         GameObject gameObject;
                                         if (cachedGames.ContainsKey(data.GameName))
                                         {
                                             gameObject = cachedGames[data.GameName];
                                         }
                                         else
                                         {
                                             gameObject = cachedGames[data.GameName] = Global.Require<GameObject>("./../games/" + data.GameName + "/app.js");
                                         }
                                         room.Fiber = CreateFiber(room, gameObject, true);
                                         room.Unwind = delegate(List<User> players)
                                         {
                                             gameData.FinishedGames++;
                                             Global.Console.Log("--game closed");

                                         };
                                         EmitAll(room, "Area.Game.RoomInfo", Json.Parse(Json.Stringify(room, Help.Sanitize)));
                                     });


            qManager.AddChannel<JoinGameRequest>("Area.Game.Join",
                                                   delegate(User user, object arg2)
                                                   {
                                                       JoinGameRequest data = ((JoinGameRequest)arg2);
                                                       GameRoom room = null;
                                                       foreach (GameRoom gameRoom in rooms)
                                                       {
                                                           if (gameRoom.RoomID == data.RoomID)
                                                           {
                                                               room = gameRoom;
                                                               break;
                                                           }
                                                       }
                                                       if (room == null)
                                                           return;
                                                       room.Players.Add(user);
                                                       room.Players.Add(user);
                                                       EmitAll(room, "Area.Game.RoomInfo", Json.Parse(Json.Stringify(room, Help.Sanitize)));
                                                   });

        }

        private void EmitAll(GameRoom room, string areaGameRoominfo, object val)
        {

        }

        private Fiber<List<User>> CreateFiber(GameRoom room, GameObject gameObject, bool emulating)
        {
            return new Fiber<List<User>>(delegate(List<User> players)
                                             {
                                                 if (players == null || players.Count == 0) return true;
                                                 room.Players = players;
                                                 Global.Console.Log("game started");
                                                 GameObject sev =null;
                                                 Script.Eval("sev= new gameObject();");

                                                 sev.CardGame.Emulating = emulating;
                                                 room.Game = sev;
                                                 sev.Shuff = requiredShuff;

                                                 sev.CardGame.SetAnswers(room.Answers);
                                                 sev.CardGame.SetPlayers(players);
                                                 gameData.TotalGames++;
                                                 gameData.TotalPlayers += players.Count;
                                                 sev.CardGame.AnswerIndex = 0;
                                                 sev.Constructor();
                                                 sev.RunGame();

                                                 room.Unwind(players);
                                                 return true;
                                             });
        }


    }

    public class JoinGameRequest
    {
        public string RoomID;
    }

    public class CreateGameRequest
    {
        public string Name;
        public string GameName;
    }

    internal class GameRoom
    {
        public string Name;
        public string GameName;
        public bool Debuggable;
        public int MaxUsers;
        public List<User> Players;
        public List<int> Answers;
        public string RoomID;
        public string GameServer;
        public bool Started;
        public Fiber<List<User>> Fiber;
        public Action<List<User>> Unwind;
        public GameObject Game;
    }

    public class GameData
    {
        public int TotalGames;
        public int TotalQuestionsAnswered;
        public int TotalPlayers;
        public int FinishedGames;
        public override string ToString()
        {
            return "Total: " + this.TotalGames + "\n Running: " + this.RunningGames() + "\n Total Players: " + this.TotalPlayers + "\n Answered: " + this.TotalQuestionsAnswered;

        }

        private int RunningGames()
        {
            return this.TotalGames - this.FinishedGames;
        }
    }

    public class DataManager
    {
    }
}
