using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using global;
using Models;
using Models.GameManagerModels;
using ServerManager.GameServer.Models;
using WebLibraries.Common;
namespace ServerManager.GameServer
{
    public class GameClientManager
    {
        #region Delegates

        public delegate void GameCreate(GameCreateRequestModel data);
        public delegate void UserAnswerQuestion(UserLogicModel user, GameAnswerQuestionModel data);
        public delegate void UserDisconnect(UserLogicModel user, UserDisconnectModel data);
        public delegate void UserLeave(UserLogicModel user, UserLeaveModel data);

        #endregion

        private QueueManager qManager;
        public string GameServerIndex { get; set; }
        private Compressor compress = new Compressor();

        public GameClientManager(string gameServerIndex)
        {
            GameServerIndex = gameServerIndex;

            Setup();
        }

        public event GameCreate OnGameCreate;
        public event UserAnswerQuestion OnUserAnswerQuestion;
        public event UserDisconnect OnUserDisconnect;
        public event UserLeave OnUserLeave;

        private void Setup()
        {
            qManager = new QueueManager(GameServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("GameServer", null),
                                                                              new QueueWatcher(GameServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "GameServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      }));

            qManager.AddChannel("Area.Game.Create", (user, data) => OnGameCreate((GameCreateRequestModel)data));
            qManager.AddChannel("Area.Game.AnswerQuestion", (user, data) => OnUserAnswerQuestion(user, (GameAnswerQuestionModel)data));
            qManager.AddChannel("Area.Game.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel)data));
            qManager.AddChannel("Area.Game.LeaveGameRoom", (user, data) => OnUserLeave(user, (UserLeaveModel)data));
        }

        private void SendMessageToAll(GameRoom room, string message, object val)
        {
            foreach (var player in room.Players)
            {
                qManager.SendMessage(player.Gateway, message, player, val);
            }
        }



        public void SendGameStarted(GameRoom room)
        {
            SendMessageToAll(room, "Area.Game.Started", new GameRoomModel() { RoomID = room.RoomID });
        }

        public void SendGameOver(GameRoom room)
        {
            SendMessageToAll(room, "Area.Game.GameOver", "a");

        }

        public void SendUpdateState(GameRoom room, UserLogicModel user)
        {

            foreach (var player in room.Players)
            {
                var tmp = Json.Parse<GameCardGame>(Json.Stringify(room.Game.CardGame));
                JsDictionary<string, CardGamePile> piles = new JsDictionary<string, CardGamePile>();

                foreach (var cgUser in tmp. Users)
                {
                    piles[cgUser.Cards.Name] = cgUser.Cards;
                    foreach (var card in cgUser.Cards.Cards)
                    {
                        if (card.State == CardGameCardState.FaceUpIfOwned && cgUser.UserName!=player.UserName )
                        {
                            card.Type = -1;
                            card.Value = -1;
                        }

                        if (card.State == CardGameCardState.FaceDown)
                        {
                            card.Type = -1;
                            card.Value = -1;
                        }
                    }
                }

                foreach (var space in tmp.Spaces)
                {
                    if (piles[space.PileName] != null)
                    {
                        space.Pile = piles[space.PileName];
                    }
                
                    foreach (var card in space.Pile.Cards)
                    {
                        if (card.State == CardGameCardState.FaceDown)
                        {
                            card.Type = -1;
                            card.Value = -1;
                        }
                    }
                }

                foreach (var card in tmp.Deck.Cards)
                {
                    if (card.State == CardGameCardState.FaceDown)
                    {
                        card.Type = -1;
                        card.Value = -1;
                    }
                }

                string stringify = Json.Stringify(tmp.CleanUp());
                ServerLogger.LogData("Send Data"+player.UserName, stringify);
                var val = compress.CompressText(stringify);
                qManager.SendMessage(player.Gateway, "Area.Game.UpdateState", player, val);
            }




        }

        public void SendAskQuestion(UserLogicModel user, GameSendAnswerModel gameAnswer)
        {
            qManager.SendMessage(user.Gateway, "Area.Game.AskQuestion", user, gameAnswer.CleanUp());
        }

        public void RegisterGameServer(UserLogicModel user)
        {
            qManager.SendMessage(user.Gateway, "Area.Game.RegisterServer", user, new RegisterServerModel(GameServerIndex));
        }

        public void UnregisterGameServer(UserLogicModel user)
        {
            qManager.SendMessage(user.Gateway, "Area.Game.UnregisterServer", user, new RegisterServerModel(GameServerIndex));
        }
    }
}