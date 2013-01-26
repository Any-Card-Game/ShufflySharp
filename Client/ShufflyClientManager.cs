using Client; 
using Models.ShufflyManagerModels;
namespace GameServer
{
    public delegate void UserLogin(object o);
    public delegate void GetGameSource(GameSourceResponseModel o);
    public delegate void GetRoomInfo(GameRoomModel o);
    public delegate void GetDebugLog(GameAnswerModel o);
    public delegate void GetDebugBreak(GameAnswerModel o);
    public delegate void AskQuestion(GameSendAnswerModel o);
    public delegate void UpdateState(string o);
    public delegate void GameStarted(GameRoomModel o);
    public delegate void GameOver(string o);
    public delegate void DebugGameOver(string o);
    public class ShufflyClientManager
    {
        private readonly string myGatewayServerAddress;
        private Gateway gateway;
        public string GameServer { get; set; }

        public ShufflyClientManager(string gatewayServerAddress)
        {
            myGatewayServerAddress = gatewayServerAddress;
            Setup();
        }

        public event UserLogin OnLogin;
        public event GetGameSource OnGetGameSource;
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
            gateway = new Gateway(myGatewayServerAddress);

            gateway.On("Area.Main.Login.Response", a => OnLogin(a));
            gateway.On("Area.Debug.GetGameSource.Response", a => OnGetGameSource((GameSourceResponseModel) a));
            gateway.On("Area.Game.RoomInfo", a => OnGetRoomInfo((GameRoomModel) a));
            gateway.On("Area.Debug.Log", a => OnGetDebugLog((GameAnswerModel) a));
            gateway.On("Area.Debug.Break", a => OnGetDebugBreak((GameAnswerModel) a));
            gateway.On("Area.Game.AskQuestion", a => OnAskQuestion((GameSendAnswerModel) a));
            gateway.On("Area.Game.UpdateState", a => OnUpdateState((string) a));
            gateway.On("Area.Game.Started", a => OnGameStarted((GameRoomModel)a));
            gateway.On("Area.Game.GameOver", a => OnGameOver((string) a));
            gateway.On("Area.Debug.GameOver", a => OnDebugGameOver((string) a));
        }

        public void Login(string randomName)
        {
            gateway.Login(randomName);
        }

        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            gateway.Emit("Area.Game.AnswerQuestion", gameAnswerQuestionModel, GameServer);
        }

        public void GetGameList()
        {
            gateway.Emit("Area.Game.GetGames", GameServer);
        }

        public void StartGame(StartGameRequestModel startGameRequestModel)
        {
            gateway.Emit("Area.Game.Start", startGameRequestModel, GameServer);
        }

        public void CreateDebuggedGame(object o)
        {
            gateway.Emit("Area.Debug.Create", o);
        }

        public void RequestGameSource(GameSourceRequestModel gameSourceRequestModel)
        {
            gateway.Emit("Area.Debug2.GetGameSource.Request", gameSourceRequestModel);
        }

        public void JoinDebugger(DebuggerJoinRequestModel debuggerJoinRequestModel)
        {
            gateway.Emit("Area.Game.DebuggerJoin", debuggerJoinRequestModel, GameServer);
        }

        public void JoinPlayer(JoinGameRequestModel joinGameRequestModel)
        {
            gateway.Emit("Area.Game.Join", joinGameRequestModel, GameServer);
        }
    }
}