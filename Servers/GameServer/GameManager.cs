using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using CommonShuffleLibrary.Data;
using FibersLibrary;
using GameServer.Models;
using Models;
using Models.GameManagerModels;
using NodeJSLibrary;
using global;
using FiberYieldResponse = GameServer.Models.FiberYieldResponse;
namespace GameServer
{
    public class GameManager
    {
        private int QUEUEPERTICK = 1;
        private List<GameAnswerQuestionModel> answerQueue = new List<GameAnswerQuestionModel>();
        private JsDictionary<string, GameObject> cachedGames;
        private DataManager dataManager;
        private GameData gameData;
        private GameClientManager myServerManager;
        private List<GameRoom> rooms;
        private int skipped__;
        private DateTime startTime = new DateTime();
        private int total__;
        private bool verbose = false;

        public GameManager(string gameServerIndex)
        {
            myServerManager = new GameClientManager(gameServerIndex);
            myServerManager.OnUserJoinGame += UserJoinGame;
            myServerManager.OnDebuggerJoinGame += DebuggerJoinGame;
            myServerManager.OnGameCreate += GameCreate;
            myServerManager.OnDebugGameCreate += DebugGameCreate;
            myServerManager.OnStartGame += StartGame;
            myServerManager.OnUserAnswerQuestion += UserAnswerQuestion;

            rooms = new List<GameRoom>();
            cachedGames = new JsDictionary<string, GameObject>();
            gameData = new GameData();
            dataManager = new DataManager();
            Global.SetInterval(flushQueue, 50);
        }

        public void UserJoinGame(UserModel user, JoinGameRequestModel data)
        {
            GameRoom room = null;
            foreach (var gameRoom in rooms) {
                if (gameRoom.RoomID == data.RoomID) {
                    room = gameRoom;
                    break;
                }
            }
            if (room == null)
                return;
            room.Players.Add(user);
            myServerManager.SendRoomInfo(room);
        }
        public void DebugGameCreate(UserModel user, DebugCreateGameRequestModel data)
        {
            GameCreate(user,new CreateGameRequestModel(data.Name,data.GameName));
        }
        public void GameCreate(UserModel user, CreateGameRequestModel data)
        {
            GameRoom room;
            rooms.Add(room = new GameRoom());
            room.Name = data.Name;
            room.MaxUsers = 6;
            room.Debuggable = true;
            room.GameName = data.GameName;

            room.Started = false;
            room.GameServer = myServerManager.GameServerIndex;
            room.Players.Add(user);

            GameObject gameObject;
            if (cachedGames.ContainsKey(data.GameName))
                gameObject = cachedGames[data.GameName];
            else
                gameObject = cachedGames[data.GameName] = Global.Require<GameObject>("./Games/" + data.GameName + "/app.js");

            room.Fiber = CreateFiber(room, gameObject, true);
            room.Unwind = players => {
                              gameData.FinishedGames++;
                              Console.Log("--game closed");
                          };
            myServerManager.SendRoomInfo(room);
        }

        public void StartGame(StartGameRequestModel data)
        {
            GameRoom room = null;
            foreach (var gameRoom in rooms) {
                if (gameRoom.RoomID == data.RoomID) {
                    room = gameRoom;
                    break;
                }
            }
            if (room == null)
                return;

            myServerManager.SendGameStarted(room);

            room.Started = true;
            Console.Log("started");

            var answer = room.Fiber.Run<FiberYieldResponse>(room.Players);
            Console.Log("doign");
            handleYield(room, answer);
            Console.Log("doign2");
        }

        public void UserAnswerQuestion(UserModel user, GameAnswerQuestionModel data)
        {
            answerQueue.Add(data);
        }

        public void DebuggerJoinGame(UserModel user, DebuggerJoinRequestModel data)
        {
            GameRoom room = null;
            foreach (var gameRoom in rooms) {
                if (gameRoom.RoomID == data.RoomID) {
                    room = gameRoom;
                    break;
                }
            }
            if (room == null)
                return;
            room.DebuggingSender = user;
            Console.Log("debuggable");
        }

        private void flushQueue()
        {
            var ind = 0;
            for (ind = 0; ind < QUEUEPERTICK; ind++) {
                if (answerQueue.Count == 0)
                    break;

                var arg2 = answerQueue[0];
                answerQueue.RemoveAt(0);
                var data = arg2.Cast<GameAnswerRequestModel>();
                GameRoom room = null;
                foreach (var gameRoom in rooms) {
                    if (gameRoom.RoomID == data.RoomID) {
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

                if (answ == null) {
                    myServerManager.SendGameOver(room);
                    room.Fiber.Run<FiberYieldResponse>();
                    rooms.Remove(room);
                    room.Unwind(room.Players);
                    continue;
                }
                gameData.TotalQuestionsAnswered++;
                dataManager.GameData.Insert(new GameInfoModel() {GameName = room.Name, AnswerIndex = answ.Contents});
                handleYield(room, answ);
            }

            if (ind == 0)
                skipped__++;
            else {
                total__ += ind;
                if (( total__ + skipped__ ) % 20 == 0)
                    Console.Log(string.Format("{0} =  tot: __{1}__ + shift: {2} + T: {3} + skip: {4} + QSize: {5} + T Rooms: {6}", myServerManager.GameServerIndex.Substring(0, 19), ( total__ + skipped__ ), ind, total__, skipped__, answerQueue.Count, rooms.Count));
            }
        }

        private void handleYield(GameRoom room, FiberYieldResponse answer)
        {
            switch (answer.Type) {
                case FiberYieldResponseType.AskQuestion:
                    var answ = answer.question;

                    if (answ == null) {
                        myServerManager.SendGameOver(room);
                        room.Fiber.Run<FiberYieldResponse>();
                        //     profiler.takeSnapshot('game over ' + room.roomID);
                        return;
                    }
                    askQuestion(answ, room);
                    //console.log(gameData.toString());

                    var dt = new DateTime();
                    var then = dt.GetMilliseconds();
                    //Console.Log(then - now + " Milliseconds");
                    Console.Log(gameData.TotalQuestionsAnswered / ( ( dt.GetTime() - startTime.GetTime() ) / 1000 ) + " Answers per seconds");

                    break;
                case FiberYieldResponseType.GameOver:

                    myServerManager.SendUpdateState(room);

                    myServerManager.SendGameOver(room);

                    break;
                case FiberYieldResponseType.Log:

                    var answ2 = room.Fiber.Run<FiberYieldResponse>();
                    handleYield(room, answ2);

                    if (!room.Game.CardGame.Emulating && room.Debuggable) {
                        //console.log(gameData.toString());
                        var ganswer = new GameAnswerModel(0, answer.Contents);

                        myServerManager.SendDebugLog(room, ganswer);
                    }
                    break;
                case FiberYieldResponseType.Break:
                    if (!room.Debuggable) {
                        var answ3 = room.Fiber.Run<FiberYieldResponse>();
                        handleYield(room, answ3);
                        return;
                    }
                    if (!room.Game.CardGame.Emulating) {
                        var ganswer = new GameAnswerModel(answer.LineNumber + 2, 0);

                        myServerManager.SendDebugBreak(room, ganswer);
                    }
                    break;
            }
        }

        private void askQuestion(GameQuestionAnswerModel answ, GameRoom room)
        {
            var user = getPlayerByUsername(room, answ.User.UserName);

            myServerManager.SendAskQuestion(user, new GameSendAnswerModel(answ.Question, answ.Answers));

            //Console.Log(Json.Stringify(mjf).Length); 

            myServerManager.SendUpdateState(room);

            if (verbose) {
                Console.Log(answ.User.UserName + ": " + answ.Question + "   ");
                var ind = 0;
                foreach (var answer in answ.Answers) {
                    Console.Log("     " + ind++ + ": " + answer);
                }
            }
        }

        private UserModel getPlayerByUsername(GameRoom room, string userName)
        {
            foreach (var player in room.Players) {
                if (player.UserName == userName)
                    return player;
            }
            return null;
        }

        private Fiber<List<UserModel>> CreateFiber(GameRoom room, GameObject gameObject, bool emulating)
        {
            return new Fiber<List<UserModel>>(players => {
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

        /*qManager.AddChannel ("Area.Game.GetGames", (sender, data) =>
            {
                qManager.SendMessage(sender, sender.Gateway, "Area.Game.RoomInfos", Json.Parse(Json.Stringify(rooms, Help.Sanitize)));
            });*/
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
    }
}