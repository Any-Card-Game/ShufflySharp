using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibrary;
using DataModels.SiteManagerModels.Game;
using global;
using Models;
using Models.DebugGameManagerModels;
using Models.GameManagerModels;
using NodeLibraries.Common.Logging;
using NodeLibraries.Fibers;
using NodeLibraries.NodeJS;
using ServerManager.DebugGameServer.Models;
using ServerManager.GameServer.Models;

namespace ServerManager.DebugGameServer
{
    public class DebugGameManager
    {
        private int QUEUEPERTICK = 1;
        private List<Tuple<UserLogicModel, DebugGameAnswerQuestionModel>> answerQueue = new List<Tuple<UserLogicModel, DebugGameAnswerQuestionModel>>();
        private DataManager dataManager;
        private DebugGameData gameData;
        private DebugGameClientManager myServerManager;
        private List<DebugGameRoom> rooms;
        private int skipped__;
        private DateTime startTime = new DateTime();
        private int total__;
        private readonly FileProcessor processor;

        public DebugGameManager(string debugServerIndex)
        {

          processor=  Global.Require<FileProcessor>("./uglify5.js");
            myServerManager = new DebugGameClientManager(debugServerIndex);
            myServerManager.OnGameCreate += CreateGame;
            myServerManager.OnHandleDebugResponse += HandleDebugResponse;
            myServerManager.OnGameDestroy += GameDestroy;
            myServerManager.OnUserAnswerQuestion += UserAnswerQuestion;
            myServerManager.OnUserDisconnect += UserDisconnect;
            myServerManager.OnUserLeave += UserLeave;

            rooms = new List<DebugGameRoom>();
            gameData = new DebugGameData();
            dataManager = new DataManager();
            Global.SetInterval(flushQueue, 50);
        }
        
        [Imported]
        private class FileProcessor
        {
            public string ProcessJSFile(string data)
            {
                return null;
            }
        }

        private void UserDisconnect(UserLogicModel user, UserDisconnectModel data)
        {
            foreach (var gameRoom in rooms)
            {
                foreach (var player in gameRoom.Players)
                {
                    if (player.UserName == user.UserName)
                    {
                        ServerLogger.LogDebug("22User Left: " + player.UserName, player);
                        gameRoom.PlayerLeave(player);
                        break;
                    }
                }
            }
        }

        private void UserLeave(UserLogicModel user, UserLeaveModel data)
        {
            foreach (var gameRoom in rooms)
            {
                foreach (var player in gameRoom.Players)
                {
                    if (player.UserName == user.UserName)
                    {
                        ServerLogger.LogDebug("11User Left: " + player.UserName, player);

                        gameRoom.PlayerLeave(player);
                        break;
                    }
                }
            }
        }
        private void GameDestroy(UserLogicModel user, DestroyDebugGameRequest data)
        {
            myServerManager.UnregisterGameServer(user);

            var room = rooms.Filter(a => a.RoomID == data.RoomID)[0];
            if (room == null)
            {
                ServerLogger.LogError("--room not found ", data);
                return;
            }
            rooms.Remove(room);
            room.Fiber.Reset();

        }


        public void CreateGame(UserLogicModel user, CreateDebugGameRequest data)
        {
            ServerLogger.LogDebug("--debug game created ", data);
            dataManager.SiteData.Game_GetGamesByName(data.GameName, (game) =>
            {
                if (game == null)
                {
                    ServerLogger.LogDebug("--game not found " + data.GameName, user);
                    return;
                }
                ServerLogger.LogDebug("--game found " + game.Name, game);

                DebugGameRoom room;
                rooms.Add(room = new DebugGameRoom());
                room.MaxUsers = data.NumberOfPlayers; //todo idk
                room.GameType = data.GameName;
                room.Started = false;
                for (int i = 0; i < data.NumberOfPlayers; i++)
                {
                    room.Players.Add(user);

                }
                room.DebuggingSender = user;
                
                GameObject evaluated_game = null;
                Script.Eval("evaluated_game=" + processor.ProcessJSFile(game.GameCode.Code));
                GameObject gameObject;
                gameObject = evaluated_game;


                room.Fiber = CreateFiber(room, gameObject, true, game, data.Breakpoints);
                room.Unwind = players =>
                {
                    gameData.FinishedGames++;
                    ServerLogger.LogDebug("--game closed", game);
                };
                room.PlayerLeave += (player) =>
                {
                    //todo laeve player api in the game
                    ////i think an action that it calls

                    room.Players.Remove(player);
                    room.PlayersLeft.Add(player);


                    if (room.Players.Count == 0)
                    { 
                        rooms.Remove(room);
                        room.Fiber.Reset();
                    }
                };

                myServerManager.RegisterGameServer(user);


                startGame(room);
            });
        }

        private void startGame(DebugGameRoom room)
        {
            if (!room.Started)
            {
                myServerManager.SendGameStarted(room);

                room.Started = true;
            }


            var answer = room.Fiber.Run<DebugFiberYieldResponse>(room.Players);
            processGameResponse(room, answer);
        }

        public void UserAnswerQuestion(UserLogicModel user, DebugGameAnswerQuestionModel data)
        {
            answerQueue.Add(Tuple.Create(user, data));
        }

        private void flushQueue()
        {
            var ind = 0;

            for (ind = 0; answerQueue.Count > 0 && ind < QUEUEPERTICK; ind++)
            {
                ServerLogger.LogDebug(string.Format("-- answer pop, queue length: {0}", answerQueue.Count), null);


                var answer = answerQueue[0];
                answerQueue.RemoveAt(0);

                var room = getRoomByPlayer(answer.Item1.UserName);
                if (room == null)
                {
                    ServerLogger.LogError("Room not found for user: " + answer.Item1.UserName, answer);

                    continue;
                    throw new Exception("idk");
                }

                var dict = new CardGameAnswer();
                dict.Value = answer.Item2.Answer;
                room.EmulatedAnswers.Add(dict);
                var answ = room.Fiber.Run<DebugFiberYieldResponse>(dict);

                //dataManager.GameData.Insert(new GameInfoModel() {GameName = room.Name, AnswerIndex = answ.Contents});
                processGameResponse(room, answ);
            }

            if (ind == 0)
                skipped__++;
            else
            {
                total__ += ind;
                if ((total__ + skipped__) % 20 == 0)
                {
                    var dt = new DateTime();
                    ServerLogger.LogDebug(string.Format("{0} =  tot: __{1}__ + shift: {2} + T: {3} + QSize: {4} + T Rooms: {5} + Per SecondL {6}",
                                             myServerManager.DebugGameServerIndex.Substring(0, 19),
                                             (total__ + skipped__),
                                             ind,
                                             total__,
                                             answerQueue.Count,
                                             rooms.Count,
                                             (gameData.TotalQuestionsAnswered / ((dt.GetTime() - startTime.GetTime()) / 1000d))),
                               null);
                }
            }
        }


        public void HandleDebugResponse(UserLogicModel user, DebugResponse data)
        {
            var room = rooms.Filter(a => a.RoomID == data.RoomID)[0];
            if (room == null)
            {
                ServerLogger.LogError("--room not found ", data);
                return;
            }
            room.Game.CardGame.DebugInfo.Breakpoints = data.Breakpoints;
            room.Game.CardGame.DebugInfo.StepThrough = data.Step;
            room.Game.CardGame.DebugInfo.Action = data.Action;
            if (room.Game.CardGame.DebugInfo.Action)
            {
                var debugFiberYieldResponse = room.Fiber.Run<DebugFiberYieldResponse>(new FiberYieldResponse(FiberYieldResponseType.VariableLookup,"") { VariableLookup = data.VariableLookup });
                processGameResponse(room, debugFiberYieldResponse);
            }
        }




        private Fiber<List<UserLogicModel>> CreateFiber(DebugGameRoom room, GameObject gameObject, bool emulating, GameDataModel game, List<int> breakpoints)
        {
            return new Fiber<List<UserLogicModel>>(players =>
            {
                if (players == null || players.Count == 0) return true;
                room.Players = players;
                ServerLogger.LogDebug("game started", room);
                GameObject sev = null;

                Script.Eval("sev = new gameObject();");
                room.PlayersLeft = new List<UserLogicModel>();
                sev.CardGame=new GameCardGame();
                sev.CardGame.Emulating = emulating;
                room.Game = sev;
                sev.CardGame.DebugInfo = new DebugInfo() { Breakpoints = breakpoints ?? new List<int>() };
                sev.CardGame.SetEmulatedAnswers(room.EmulatedAnswers);
                sev.CardGame.SetPlayers(players);
                sev.CardGame.Size = new Size(game.GameLayout.Width, game.GameLayout.Height);

                foreach (var gameTextModel in game.GameLayout.Texts)
                {
                    sev.CardGame.TextAreas.Add(new GameCardGameTextArea(new GameCardGameTextAreaOptions()
                    {
                        X = gameTextModel.Left,
                        Y = gameTextModel.Top,
                        Name = gameTextModel.Name,
                        Text = gameTextModel.Text,

                    }));
                }


                foreach (var gameSpaceModel in game.GameLayout.Spaces)
                {
                    sev.CardGame.Spaces.Add(new CardGameTableSpace(new CardGameTableSpaceOptions()
                    {
                        X = gameSpaceModel.Left,
                        Y = gameSpaceModel.Top,
                        Height = gameSpaceModel.Height,
                        Width = gameSpaceModel.Width,
                        Name = gameSpaceModel.Name,
                        Vertical = gameSpaceModel.Vertical,
                        ResizeType = gameSpaceModel.ResizeType
                    }));
                }

                foreach (var gameEffect in game.Effects)
                {
                    sev.CardGame.Effects.Add(new CardGameEffect(new CardGameEffectOptions()
                    {
                        Name = gameEffect.Name,
                        Type = gameEffect.Type,
                        Properties = gameEffect.Properties.Map(a => new CardGameEffectProperty() { Name = a.Name, Value = a.Value })
                    }));
                }

                gameData.TotalGames++;
                gameData.TotalPlayers += players.Count;
                sev.CardGame.EmulatedAnswerIndex = 0;

                //todo to data
                sev.CardGame.NumberOfCards = 52;
                sev.CardGame.NumberOfJokers = 0;

                sev.CardGame.ConfigurationCompleted();
                sev.Constructor();
                sev.RunGame();
                ServerLogger.LogDebug("Doneski", gameData);

                room.Unwind(players);
                return true;
            });
        }

        private void processGameResponse(DebugGameRoom room, DebugFiberYieldResponse response)
        {
            if (response == null)
            {
                ServerLogger.LogDebug("game request over", room);

                myServerManager.SendGameOver(room);
                room.Fiber.Run<DebugFiberYieldResponse>();
                rooms.Remove(room);
                room.Unwind(room.Players);
                return;
            }


            switch (response.Type)
            {
                case DebugFiberYieldResponseType.AskQuestion:
                    askPlayerQuestion(room, response);
                    break;

                case DebugFiberYieldResponseType.PlayersLeft:
                    didPlayersLeave(room, response);
                    break;
                case DebugFiberYieldResponseType.GameOver:
                    gameOver(room);
                    break;
                case DebugFiberYieldResponseType.Log:
                    logGameConsoleLine(room, response);
                    break;
                case DebugFiberYieldResponseType.VariableLookup:
                    Console.WriteLine("vlook  " + Json.Stringify(response));
                    breakGameExecution(room, response);
                    break;
                case DebugFiberYieldResponseType.Break:
                    Console.WriteLine("broke  " + Json.Stringify(response));
                    breakGameExecution(room, response);
                    break;
            }
        }

        private void didPlayersLeave(DebugGameRoom room, DebugFiberYieldResponse response)
        {
            room.Fiber.Run<DebugFiberYieldResponse>(room.PlayersLeft);

            room.PlayersLeft.Clear();
        }

        private void breakGameExecution(DebugGameRoom room, DebugFiberYieldResponse response)
        {

            var ganswer = new DebugGameBreakModel(response.LineNumber, response.Value);

            myServerManager.SendDebugBreak(room, ganswer);
        }

        private void logGameConsoleLine(DebugGameRoom room, DebugFiberYieldResponse answer)
        {
            var answ2 = room.Fiber.Run<DebugFiberYieldResponse>();
            processGameResponse(room, answ2);

            if (!room.Game.CardGame.Emulating)
            { 
                myServerManager.SendDebugLog(room, new DebugGameLogModel(answer.Contents));
            }
        }

        private void gameOver(DebugGameRoom room)
        {
            ServerLogger.LogDebug("game real over", room);

            myServerManager.SendUpdateState(room);

            myServerManager.SendGameOver(room);

            rooms.Remove(room);
            room.Fiber.Reset();
        }

        private void askPlayerQuestion(DebugGameRoom room, DebugFiberYieldResponse answer)
        {
            gameData.TotalQuestionsAnswered++;

            var answ = answer.Question;

            if (answ == null)
            {
                ServerLogger.LogDebug("game question over", room);
                myServerManager.SendGameOver(room);
                room.Fiber.Run<DebugFiberYieldResponse>();
                //     profiler.takeSnapshot('game over ' + room.roomID);
                return;
            }
            askQuestion(answ, room);
            //ServerLogger.Log(gameData.toString());

            var dt = new DateTime();
            var then = dt.GetMilliseconds();
            //ServerLogger.Log(then - now + " Milliseconds");
            //  ServerLogger.Log(gameData.TotalQuestionsAnswered / ((dt.GetTime() - startTime.GetTime()) / 1000d) + " Answers per seconds", LogLevel.DebugInformation);
        }

        private void askQuestion(CardGameQuestion answ, DebugGameRoom room)
        {
            var user = getPlayerByUsername(room, answ.User.UserName);
            myServerManager.SendAskQuestion(user, new DebugGameSendAnswerModel(answ.Question, answ.Answers));
            myServerManager.SendUpdateState(room);


            ServerLogger.LogDebug("Ask question   ", answ);
        }

        private UserLogicModel getPlayerByUsername(DebugGameRoom room, string userName)
        {
            foreach (var player in room.Players)
            {
                if (player.UserName == userName)
                    return player;
            }
            return null;
        }

        private DebugGameRoom getRoomByPlayer(string userName)
        {
            foreach (var gameRoom in rooms)
            {
                foreach (var userLogicModel in gameRoom.Players)
                {
                    if (userLogicModel.UserName == userName)
                        return gameRoom;
                }
            }
            return null;
        }

        /*
             

qManager.addChannel('Area.Game.GetRooms', function (sender, data) {
socket.emit('Area.Game.GetRoomsResponse', JSON.parse(JSON.stringify(rooms, sanitize)));
});

qManager.addChannel('Area.Debug.Continue', function (sender, data) {
var room = socket.room;
var answ = room.fiber.run(null);
processGameResponse(room, answ);
});


qManager.addChannel('Area.Debug.PushNewSource', function (sender, data) {
var room = socket.room;

var module = {};
eval(applyBreakpoints(data.source, data.breakPoints));
var sevens = module.exports;

room.fiber = createFiber(room, sevens, true);
var answ = room.fiber.run(room.players);
processGameResponse(room, answ);

});
qManager.addChannel('Area.Debug.VariableLookup.Request', function (sender, data) {
var room = socket.room;
var answ = room.fiber.run({ variableLookup: data.variableName });
if (!answ.type == 'variableLookup')
         */
    }

}