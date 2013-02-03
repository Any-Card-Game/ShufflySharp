using Client.Libs;
using Models;
using Models.GameManagerModels;
namespace Client.Managers
{
    public class ClientGameManager
    {
        #region Delegates

        public delegate void AskQuestion(UserModel user, GameSendAnswerModel o);
        public delegate void DebugGameOver(UserModel user, string o);
        public delegate void GameOver(UserModel user, string o);
        public delegate void GameStarted(UserModel user, GameRoomModel o);
        public delegate void GetDebugBreak(UserModel user, GameAnswerModel o);
        public delegate void GetDebugLog(UserModel user, GameAnswerModel o);
        public delegate void GetRoomInfo(UserModel user, GameRoomModel o);
        public delegate void UpdateState(UserModel user, string o);

        #endregion

        private readonly Gateway myGateway;

        public ClientGameManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event GetRoomInfo OnGetRoomInfo;
        public event GetDebugLog OnGetDebugLog;
        public event GetDebugBreak OnGetDebugBreak;
        public event AskQuestion OnAskQuestion;
        public event UpdateState OnUpdateState;
        public event GameStarted OnGameStarted;
        public event GameOver OnGameOver;
        public event DebugGameOver OnDebugGameOver;

        private void Setup()
        {
            myGateway.On("Area.Game.RoomInfo", (user, data) => OnGetRoomInfo(user, (GameRoomModel)data));
            myGateway.On("Area.Debug.Log", (user, data) => OnGetDebugLog(user, (GameAnswerModel)data));
            myGateway.On("Area.Debug.Break", (user, data) => OnGetDebugBreak(user, (GameAnswerModel)data));
            myGateway.On("Area.Game.AskQuestion", (user, data) => OnAskQuestion(user, (GameSendAnswerModel)data));
            myGateway.On("Area.Game.UpdateState", (user, data) => OnUpdateState(user, (string)data));
            myGateway.On("Area.Game.Started", (user, data) => OnGameStarted(user, (GameRoomModel)data));
            myGateway.On("Area.Game.GameOver", (user, data) => OnGameOver(user, (string)data));
            myGateway.On("Area.Debug.GameOver", (user, data) => OnDebugGameOver(user,(string)data));
        }

        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            myGateway.Emit("Area.Game.AnswerQuestion", gameAnswerQuestionModel);
        }

        public void StartGame(StartGameRequestModel startGameRequestModel)
        {
            myGateway.Emit("Area.Game.Start", startGameRequestModel);
        }

        public void CreateDebuggedGame(DebugCreateGameRequestModel o)
        {
            myGateway.Emit("Area.Debug.Create", o);
        }

        public void JoinDebugger(DebuggerJoinRequestModel debuggerJoinRequestModel)
        {
            myGateway.Emit("Area.Game.DebuggerJoin", debuggerJoinRequestModel);
        }

        public void JoinPlayer(JoinGameRequestModel joinGameRequestModel)
        {
            myGateway.Emit("Area.Game.Join", joinGameRequestModel);
        }
    }
}