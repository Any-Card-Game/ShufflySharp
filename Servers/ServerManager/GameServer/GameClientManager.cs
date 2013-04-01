using CommonLibraries;
using CommonShuffleLibrary;
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
             
            qManager.AddChannel("Area.Game.Create", (user, data) => OnGameCreate((GameCreateRequestModel) data)); 
            qManager.AddChannel("Area.Game.AnswerQuestion", (user, data) => OnUserAnswerQuestion(user, (GameAnswerQuestionModel) data));
            qManager.AddChannel("Area.Game.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel)data));
            qManager.AddChannel("Area.Game.LeaveGameRoom", (user, data) => OnUserLeave(user, (UserLeaveModel)data));
        }

        private void SendMessageToAll(GameRoom room, string message, object val)
        {
            foreach (var player in room.Players) {
                qManager.SendMessage(player.Gateway, message, player, val);
            }
        }

      

        public void SendGameStarted(GameRoom room)
        {
            SendMessageToAll(room, "Area.Game.Started", new GameRoomModel() { RoomID = room.RoomID});
        }

        public void SendGameOver(GameRoom room)
        {
            SendMessageToAll(room, "Area.Game.GameOver", "a");

            if (room.DebuggingSender != null)
                qManager.SendMessage(room.DebuggingSender.Gateway, "Area.Debug.GameOver", room.DebuggingSender, new object());
        }

        public void SendUpdateState(GameRoom room)
        {
            SendMessageToAll(room, "Area.Game.UpdateState", new Compressor().CompressText(Json.Stringify(room.Game.CardGame.CleanUp())));
        }

        public void SendDebugLog(GameRoom room, GameAnswerModel ganswer)
        {
            qManager.SendMessage(room.DebuggingSender.Gateway, "Area.Debug.Log", room.DebuggingSender, ganswer);
        }

        public void SendDebugBreak(GameRoom room, GameAnswerModel ganswer)
        {
            qManager.SendMessage(room.DebuggingSender.Gateway, "Area.Debug.Break", room.DebuggingSender, ganswer);
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