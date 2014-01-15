using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.DebugGameManagerModels;
using Models.GameManagerModels;
using ServerManager.DebugGameServer.Models;
using WebLibraries.Common;

namespace ServerManager.DebugGameServer
{
    public class DebugGameClientManager
    {
        #region Delegates

        public delegate void GameCreate(UserLogicModel user, CreateDebugGameRequest data);
        public delegate void HandleDebugResponse(UserLogicModel user, DebugResponse data);
        public delegate void GameDestroy(UserLogicModel user, DestroyDebugGameRequest data);
        public delegate void UserAnswerQuestion(UserLogicModel user, DebugGameAnswerQuestionModel data);
        public delegate void UserDisconnect(UserLogicModel user, UserDisconnectModel data);
        public delegate void UserLeave(UserLogicModel user, UserLeaveModel data);

        #endregion

        private QueueManager qManager;
        public string DebugGameServerIndex { get; set; }

        public DebugGameClientManager(string debugGameServerIndex)
        {
            DebugGameServerIndex = debugGameServerIndex;

            Setup();
        }

        public event GameCreate OnGameCreate;
        public event GameDestroy OnGameDestroy; 
        public event UserAnswerQuestion OnUserAnswerQuestion;
        public event UserDisconnect OnUserDisconnect;
        public event HandleDebugResponse OnHandleDebugResponse;
        public event UserLeave OnUserLeave;

        private void Setup()
        {
            qManager = new QueueManager(DebugGameServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("DebugServer", null),
                                                                              new QueueWatcher(DebugGameServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "DebugServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      }));

            qManager.AddChannel("Area.Debug.Create", (user, data) => OnGameCreate(user, (CreateDebugGameRequest)data));
            qManager.AddChannel("Area.Debug.DebugResponse", (user, data) => OnHandleDebugResponse(user, (DebugResponse)data));
            qManager.AddChannel("Area.Debug.Destroy", (user, data) => OnGameDestroy(user, (DestroyDebugGameRequest)data));
            qManager.AddChannel("Area.Debug.AnswerQuestion", (user, data) => OnUserAnswerQuestion(user, (DebugGameAnswerQuestionModel)data));
            qManager.AddChannel("Area.Debug.UserDisconnect", (user, data) => OnUserDisconnect(user, (UserDisconnectModel)data));
            qManager.AddChannel("Area.Debug.LeaveGameRoom", (user, data) => OnUserLeave(user, (UserLeaveModel)data));
        }

        private void SendMessageToTester(DebugGameRoom room, string message, object val)
        {
            qManager.SendMessage(room.DebuggingSender.Gateway, message, room.DebuggingSender, val);
        } 

        public void SendGameStarted(DebugGameRoom room)
        {
            SendMessageToTester(room, "Area.Debug.Started", new GameRoomModel() { RoomID = room.RoomID });
        }

        public void SendGameOver(DebugGameRoom room) 
        {
            SendMessageToTester(room, "Area.Debug.GameOver", "a");

        }

        public void SendUpdateState(DebugGameRoom room)
        {
            SendMessageToTester(room, "Area.Debug.UpdateState", new Compressor().CompressText(Json.Stringify(room.Game.CardGame.CleanUp())));
        }

        public void SendDebugLog(DebugGameRoom room, DebugGameLogModel ganswer)
        {
            qManager.SendMessage(room.DebuggingSender.Gateway, "Area.Debug.Log", room.DebuggingSender, ganswer);
        }

        public void SendDebugBreak(DebugGameRoom room, DebugGameBreakModel ganswer)
        {
            qManager.SendMessage(room.DebuggingSender.Gateway, "Area.Debug.Break", room.DebuggingSender, ganswer);
        }

        public void SendAskQuestion(UserLogicModel user, DebugGameSendAnswerModel gameAnswer)
        {
            qManager.SendMessage(user.Gateway, "Area.Debug.AskQuestion", user, gameAnswer.CleanUp());
        }

        public void RegisterGameServer(UserLogicModel user)
        {
            qManager.SendMessage(user.Gateway, "Area.Debug.RegisterServer", user, new RegisterServerModel(DebugGameServerIndex));
        }

        public void UnregisterGameServer(UserLogicModel user)
        {
            qManager.SendMessage(user.Gateway, "Area.Debug.UnregisterServer", user, new RegisterServerModel(DebugGameServerIndex));
        }
    }
}