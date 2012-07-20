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
        private int QUEUEPERTICK = 1;
        private int total__ = 0;
        private int skipped__ = 0;
        private DataManager dataManager;
        private FS fs;
        private ChildProcess childProcess;
        private List<object> queueue = new List<object>();
        private string gameServerIndex;
        public GameServer()
        {

            Global.Require<NodeModule>("Help");
            fs = Global.Require<FS>("fs");
            childProcess = Global.Require<ChildProcess>("child_process");

            dataManager = new DataManager();
            gameServerIndex = "GameServer" + Guid.NewGuid();
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
                                         room.Answers = new List<GameAnswer>();
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

            qManager.AddChannel<object>("Area.Game.GetGames", delegate(User sender, object data)
            {
                qManager.SendMessage(sender, sender.Gateway, "Area.Game.RoomInfos", Json.Parse(Json.Stringify(rooms, Help.Sanitize)));
            });

            qManager.AddChannel<object>("Area.Game.DebuggerJoin", delegate(User sender, object arg2)
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
                room.DebuggingSender = sender;
                Global.Console.Log("debuggable");
            });

            qManager.AddChannel<object>("Area.Game.Start", delegate(User sender, object arg2)
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
                EmitAll(room, "Area.Game.Started", Json.Parse(Json.Stringify(room, Help.Sanitize)));
                room.Started = true;
                FiberYieldResponse answer = room.Fiber.Run<FiberYieldResponse>(room.Players);
                handleYield(room, answer);

            });

            qManager.AddChannel<object>("Area.Game.AnswerQuestion", delegate(User sender, object data)
            {
                queueue.Add(data);

            });

            Global.SetInterval(flushQueue, 50);
        }
        private void flushQueue()
        {

            int ind = 0;
            for (ind = 0; ind < QUEUEPERTICK; ind++)
            {
                if (queueue.Count == 0)
                    break;

                object arg2 = queueue[0];
                queueue.RemoveAt(0);

                GameAnswerRequest data = ((GameAnswerRequest)arg2);
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

                GameAnswer dict = new GameAnswer();
                dict.Value = data.AnswerIndex;
                room.Answers.Add(dict);
                FiberYieldResponse answ = room.Fiber.Run<FiberYieldResponse>(dict);
                gameData.TotalQuestionsAnswered++;
                dataManager.GameData.Insert(room.Name, answ);

                if (answ == null)
                {
                    EmitAll(room, "Area.Game.GameOver", "a");
                    room.Fiber.Run<object>();
                    rooms.Remove(room);
                    room.Unwind(room.Players);
                    continue;
                }
                handleYield(room, answ);
            }



            if (ind == 0)
            {
                skipped__++;
            }
            else
            {
                total__ += ind;
                if ((total__ + skipped__) % 20 == 0)
                    Global.Console.Log(gameServerIndex.Substring(0, 19) + "=  tot: __" + (total__ + skipped__) + "__ + shift: " + ind + " + T: " + total__ + " + skip: " + skipped__ + " + QSize: " + queueue.Count + " + T Rooms: " +
                                       rooms.Count);
            }

        }

        private void handleYield(GameRoom room, FiberYieldResponse answer)
        {

            switch (answer.Type)
            {
                case "askQuestion":
                    GameQuestionAnswer answ = answer.question;

                    if (answ == null)
                    {
                        EmitAll(room, "Area.Game.GameOver", "");
                        room.Fiber.Run<object>();
                        //     profiler.takeSnapshot('game over ' + room.roomID);
                        return;
                    }
                    askQuestion(answ, room);
                    //console.log(gameData.toString());

                    Date dt = new Date();
                    int then = dt.GetMilliseconds();
                    //Global.Console.Log(then - now + " Milliseconds");
                    Global.Console.Log(gameData.TotalQuestionsAnswered / ((dt.GetTime() - startTime.GetTime()) / 1000) + " Answers per seconds");



                    break;
                case "gameOver":
                    EmitAll(room, "Area.Game.GameOver", "");

                    if (room.DebuggingSender != null)
                    {
                        qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.GameOver", new object());
                    }
                    break;
                case "log":

                    FiberYieldResponse answ2 = room.Fiber.Run<FiberYieldResponse>();
                    handleYield(room, answ2);


                    if (!room.Game.CardGame.Emulating && room.Debuggable)
                    {
                        //console.log(gameData.toString());
                        GameAnswer ganswer = new GameAnswer();
                        ganswer.Value = answer.Contents;

                        qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.Log", ganswer);
                    }
                    break;
                case "break":
                    if (!room.Debuggable)
                    {
                        FiberYieldResponse answ3 = room.Fiber.Run<FiberYieldResponse>();
                        handleYield(room, answ3);
                        return;
                    }
                    if (!room.Game.CardGame.Emulating)
                    {
                        GameAnswer ganswer = new GameAnswer();
                        ganswer.LineNumber = answer.LineNumber + 2;
                        qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.Break", ganswer);
                    }
                    break;

            }

        }


        private void askQuestion(GameQuestionAnswer answ, GameRoom room)
        {
            User user = getPlayerByUsername(room, answ.User.UserName);

            GameSendAnswer gameAnswer = new GameSendAnswer();
            gameAnswer.Answers = answ.Answers;
            gameAnswer.Question = answ.Question;

            qManager.SendMessage(user, user.Gateway, "Area.Game.AskQuestion", Json.Parse((Json.Stringify(gameAnswer, Help.Sanitize))));

            EmitAll(room, "Area.Game.UpdateState", Json.Parse(Json.Stringify(answ.CardGame, Help.Sanitize)));


            if (verbose)
            {
                Global.Console.Log(answ.User.UserName + ": " + answ.Question + "   ");
                int ind = 0;
                foreach (string answer in answ.Answers)
                {
                    Global.Console.Log("     " + ind++ + ": " + answer);
                }
            }

        }

        private User getPlayerByUsername(GameRoom room, string userName)
        {
            foreach (User player in room.Players)
            {
                if (player.UserName == userName)
                {
                    return player;
                }
            }
            return null;
        }


        private void EmitAll(GameRoom room, string message, object val)
        {
            foreach (User player in room.Players)
            {
                qManager.SendMessage(player, player.Gateway, message, val);
            }
        }

        private Fiber<List<User>> CreateFiber(GameRoom room, GameObject gameObject, bool emulating)
        {
            return new Fiber<List<User>>(delegate(List<User> players)
                                             {
                                                 if (players == null || players.Count == 0) return true;
                                                 room.Players = players;
                                                 Global.Console.Log("game started");
                                                 GameObject sev = null;
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
}
