using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using FibersLibrary;
using Models;
using NodeJSLibrary;
using global;

namespace GameServer
{
    public class GameServer
    {
        private int QUEUEPERTICK = 1;
        private JsDictionary<string, GameObject> cachedGames;
        private ChildProcess childProcess;
        private DataManager dataManager;
        private FS fs;
        private GameData gameData;
        private string gameServerIndex;
        private QueueManager qManager;
        private List<GameAnswerQuestionModel> queueue = new List<GameAnswerQuestionModel>();
        private List<GameRoom> rooms;
        private int skipped__;
        private DateTime startTime = new DateTime();
        private int total__;
        private bool verbose = false;

        public GameServer()
        {
            new ArrayUtils();
            fs = Global.Require<FS>("fs");
            childProcess = Global.Require<ChildProcess>("child_process");

            dataManager = new DataManager();
            gameServerIndex = "GameServer" + Guid.NewGuid();
            cachedGames = new JsDictionary<string, GameObject>();
            Global.Require<NodeModule>("fibers");
            rooms = new List<GameRoom>();
            gameData = new GameData();
            Global.Process.On("exit", () => Console.Log("exi"));
            /*qManager.AddChannel("Area.Game.Create", (arg1, arg2) =>
                {
                    GameRoom room;
                    rooms.Add(room = new GameRoom());
                });*/

            qManager = new QueueManager(gameServerIndex, new QueueManagerOptions(new[]
                {
                    new QueueWatcher("GameServer", null),
                    new QueueWatcher(gameServerIndex, null),
                }, new[]
                    {
                        "GameServer",
                        "GatewayServer",
                        "Gateway*"
                    }));

            qManager.AddChannel<CreateGameRequestModel>("Area.Debug.Create",
                                                        (user, data) =>
                                                            {
                                                                data.GameName = "Sevens";
                                                                GameRoom room;
                                                                rooms.Add(room = new GameRoom());
                                                                room.Name = data.Name;
                                                                room.MaxUsers = 6;
                                                                room.Debuggable = true;
                                                                room.GameName = data.GameName;

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
                                                                    gameObject = cachedGames[data.GameName] = Global.Require<GameObject>("./Games/" + data.GameName + "/app.js");
                                                                }
                                                                room.Fiber = CreateFiber(room, gameObject, true);
                                                                room.Unwind = players =>
                                                                    {
                                                                        gameData.FinishedGames++;
                                                                        Console.Log("--game closed");
                                                                    };
                                                                EmitAll(room, "Area.Game.RoomInfo", room.CleanUp());
                                                            });


            qManager.AddChannel<JoinGameRequestModel>("Area.Game.Join",
                                                      (user, data) =>
                                                          {
                                                              GameRoom room = null;
                                                              foreach (var gameRoom in rooms)
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
                                                              EmitAll(room, "Area.Game.RoomInfo", room.CleanUp());
                                                          });

            /*qManager.AddChannel ("Area.Game.GetGames", (sender, data) =>
                {
                    qManager.SendMessage(sender, sender.Gateway, "Area.Game.RoomInfos", Json.Parse(Json.Stringify(rooms, Help.Sanitize)));
                });*/

            qManager.AddChannel<DebuggerJoinRequestModel>("Area.Game.DebuggerJoin", (sender, data) =>
                {
                    GameRoom room = null;
                    foreach (var gameRoom in rooms)
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
                    Console.Log("debuggable");
                });

            qManager.AddChannel<StartGameRequestModel>("Area.Game.Start", (sender, data) =>
                {
                    GameRoom room = null;
                    foreach (var gameRoom in rooms)
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
                    Console.Log("started");

                    var answer = room.Fiber.Run<FiberYieldResponse>(room.Players);
                    Console.Log("doign");
                    handleYield(room, answer);
                    Console.Log("doign2");
                });


            /*
             

qManager.addChannel('Area.Game.GetRooms', function (sender, data) {
    socket.emit('Area.Game.GetRoomsResponse', JSON.parse(JSON.stringify(rooms, sanitize)));
});

qManager.addChannel('Area.Debug.Continue', function (sender, data) {
    var room = socket.room;
    var answ = room.fiber.run(null);
    handleYield(room, answ);
});


qManager.addChannel('Area.Debug.PushNewSource', function (sender, data) {
    var room = socket.room;

    var module = {};
    eval(applyBreakpoints(data.source, data.breakPoints));
    var sevens = module.exports;

    room.fiber = createFiber(room, sevens, true);
    var answ = room.fiber.run(room.players);
    handleYield(room, answ);

});
qManager.addChannel('Area.Debug.VariableLookup.Request', function (sender, data) {
    var room = socket.room;
    var answ = room.fiber.run({ variableLookup: data.variableName });
    if (!answ.type == 'variableLookup')
             */
            qManager.AddChannel<GameAnswerQuestionModel>("Area.Game.AnswerQuestion", (sender, data) => queueue.Add(data));

            Global.SetInterval(flushQueue, 50);
        }

        private void flushQueue()
        {
            var ind = 0;
            for (ind = 0; ind < QUEUEPERTICK; ind++)
            {
                if (queueue.Count == 0)
                    break;

                var arg2 = queueue[0];
                queueue.RemoveAt(0);
                var data = arg2.castValue<GameAnswerRequestModel>();
                GameRoom room = null;
                foreach (var gameRoom in rooms)
                {
                    if (gameRoom.RoomID == data.RoomID)
                    {
                        room = gameRoom;
                        break;
                    }
                }
                if (room == null)
                    return;


                var dict = new CardGameAnswer();
                dict.Value = data.Answer;
                room.Answers.Add(dict);
                var answ = room.Fiber.Run<FiberYieldResponse>(dict);


                if (answ == null)
                {
                    EmitAll(room, "Area.Game.GameOver", "a");
                    room.Fiber.Run<FiberYieldResponse>();
                    rooms.Remove(room);
                    room.Unwind(room.Players);
                    continue;
                }
                gameData.TotalQuestionsAnswered++;
                dataManager.GameData.Insert(room.Name, answ.Contents);
                handleYield(room, answ);
            }


            if (ind == 0)
            {
                skipped__++;
            }
            else
            {
                total__ += ind;
                if ((total__ + skipped__)%20 == 0)
                    Console.Log(gameServerIndex.Substring(0, 19) + "=  tot: __" + (total__ + skipped__) + "__ + shift: " + ind + " + T: " + total__ + " + skip: " + skipped__ + " + QSize: " + queueue.Count + " + T Rooms: " +
                                rooms.Count);
            }
        }

        private void handleYield(GameRoom room, FiberYieldResponse answer)
        {
            switch (answer.Type)
            {
                case "askQuestion":
                    var answ = answer.question;

                    if (answ == null)
                    {
                        EmitAll(room, "Area.Game.GameOver", "");
                        room.Fiber.Run<FiberYieldResponse>();
                        //     profiler.takeSnapshot('game over ' + room.roomID);
                        return;
                    }
                    askQuestion(answ, room);
                    //console.log(gameData.toString());

                    var dt = new DateTime();
                    var then = dt.GetMilliseconds();
                    //Console.Log(then - now + " Milliseconds");
                    Console.Log(gameData.TotalQuestionsAnswered/((dt.GetTime() - startTime.GetTime())/1000) + " Answers per seconds");


                    break;
                case "gameOver":
                    EmitAll(room, "Area.Game.GameOver", "");

                    if (room.DebuggingSender != null)
                    {
                        qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.GameOver", new object());
                    }
                    break;
                case "log":

                    var answ2 = room.Fiber.Run<FiberYieldResponse>();
                    handleYield(room, answ2);


                    if (!room.Game.CardGame.Emulating && room.Debuggable)
                    {
                        //console.log(gameData.toString());
                        var ganswer = new GameAnswer();
                        ganswer.Value = answer.Contents;

                        qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.Log", ganswer);
                    }
                    break;
                case "break":
                    if (!room.Debuggable)
                    {
                        var answ3 = room.Fiber.Run<FiberYieldResponse>();
                        handleYield(room, answ3);
                        return;
                    }
                    if (!room.Game.CardGame.Emulating)
                    {
                        var ganswer = new GameAnswer();
                        ganswer.LineNumber = answer.LineNumber + 2;
                        qManager.SendMessage(room.DebuggingSender, room.DebuggingSender.Gateway, "Area.Debug.Break", ganswer);
                    }
                    break;
            }
        }


        private void askQuestion(GameQuestionAnswerModel answ, GameRoom room)
        {
            var user = getPlayerByUsername(room, answ.User.UserName);

            var gameAnswer = new GameSendAnswerModel();
            gameAnswer.Answers = answ.Answers;
            gameAnswer.Question = answ.Question;

            qManager.SendMessage(user, user.Gateway, "Area.Game.AskQuestion", gameAnswer.CleanUp());

            EmitAll(room, "Area.Game.UpdateState", answ.CardGame.CleanUp());


            if (verbose)
            {
                Console.Log(answ.User.UserName + ": " + answ.Question + "   ");
                var ind = 0;
                foreach (var answer in answ.Answers)
                {
                    Console.Log("     " + ind++ + ": " + answer);
                }
            }
        }

        private UserModel getPlayerByUsername(GameRoom room, string userName)
        {
            foreach (var player in room.Players)
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
            foreach (var player in room.Players)
            {
                qManager.SendMessage(player, player.Gateway, message, val);
            }
        }

        private Fiber<List<UserModel>> CreateFiber(GameRoom room, GameObject gameObject, bool emulating)
        {
            return new Fiber<List<UserModel>>(players =>
                {
                    if (players == null || players.Count == 0) return true;
                    room.Players = players;
                    Console.Log("game started");
                    GameObject sev = null;

                    Script.Eval("sev= new gameObject();");

                    sev.CardGame.Emulating = emulating;
                    room.Game = sev;
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