using Models.GameManagerModels;
namespace Client.Managers
{
    public class ClientGameManager
    {
        #region Delegates

        public delegate void AskQuestion(GameSendAnswerModel o);
        public delegate void DebugGameOver(string o);
        public delegate void GameOver(string o);
        public delegate void GameStarted(GameRoomModel o);
        public delegate void GetDebugBreak(GameAnswerModel o);
        public delegate void GetDebugLog(GameAnswerModel o);
        public delegate void GetRoomInfo(GameRoomModel o);
        public delegate void UpdateState(string o);

        #endregion

        private readonly Gateway myGateway;
        public string GameServer { get; set; }

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
            myGateway.On("Area.Game.RoomInfo", a => OnGetRoomInfo((GameRoomModel) a));
            myGateway.On("Area.Debug.Log", a => OnGetDebugLog((GameAnswerModel) a));
            myGateway.On("Area.Debug.Break", a => OnGetDebugBreak((GameAnswerModel) a));
            myGateway.On("Area.Game.AskQuestion", a => OnAskQuestion((GameSendAnswerModel) a));
            myGateway.On("Area.Game.UpdateState", a => OnUpdateState((string) a));
            myGateway.On("Area.Game.Started", a => OnGameStarted((GameRoomModel) a));
            myGateway.On("Area.Game.GameOver", a => OnGameOver((string) a));
            myGateway.On("Area.Debug.GameOver", a => OnDebugGameOver((string) a));
        }

        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            myGateway.Emit("Area.Game.AnswerQuestion", gameAnswerQuestionModel, GameServer);
        }

        public void StartGame(StartGameRequestModel startGameRequestModel)
        {
            myGateway.Emit("Area.Game.Start", startGameRequestModel, GameServer);
        }

        public void CreateDebuggedGame(DebugCreateGameRequestModel o)
        {
            myGateway.Emit("Area.Debug.Create", o);
        }

        public void JoinDebugger(DebuggerJoinRequestModel debuggerJoinRequestModel)
        {
            myGateway.Emit("Area.Game.DebuggerJoin", debuggerJoinRequestModel, GameServer);
        }

        public void JoinPlayer(JoinGameRequestModel joinGameRequestModel)
        {
            myGateway.Emit("Area.Game.Join", joinGameRequestModel, GameServer);
        }
    }
}