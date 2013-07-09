using Models;
using Models.DebugGameManagerModels;
using Models.GameManagerModels;
namespace ClientLibs.Managers
{
    public class ClientDebugManager
    {
                #region Delegates

        public delegate void AskQuestion(UserModel user, GameSendAnswerModel o);
        public delegate void GameOver(UserModel user, string o);
        public delegate void GameStarted(UserModel user, GameRoomModel o);
        public delegate void UpdateState(UserModel user, string o); 
        public delegate void GetDebugBreak(UserModel user, DebugGameBreakModel o);
        public delegate void GetDebugLog(UserModel user, DebugGameLogModel o);

        #endregion

        private readonly Gateway myGateway;

        public ClientDebugManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event AskQuestion OnAskQuestion;
        public event UpdateState OnUpdateState;
        public event GameStarted OnGameStarted;
        public event GameOver OnGameOver;
        public event GetDebugLog OnGetDebugLog;
        public event GetDebugBreak OnGetDebugBreak;
        

        private void Setup()
        {
            myGateway.On("Area.Debug.AskQuestion", (user, data) => { if (OnAskQuestion != null) OnAskQuestion(user, (GameSendAnswerModel)data); });
            myGateway.On("Area.Debug.UpdateState", (user, data) => { if (OnUpdateState != null) OnUpdateState(user, (string)data); });
            myGateway.On("Area.Debug.Started", (user, data) => { if (OnGameStarted != null) OnGameStarted(user, (GameRoomModel)data); });
            myGateway.On("Area.Debug.GameOver", (user, data) => { if (OnGameOver != null) OnGameOver(user, (string)data); });
      
            myGateway.On("Area.Debug.Log", (user, data) => { if (OnGetDebugLog != null) OnGetDebugLog(user, (DebugGameLogModel)data); });
            myGateway.On("Area.Debug.Break", (user, data) => { if (OnGetDebugBreak != null) OnGetDebugBreak(user, (DebugGameBreakModel)data); });
        }
        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            myGateway.Emit("Area.Debug.AnswerQuestion", gameAnswerQuestionModel);
        }

        public void CreateGame(CreateDebugGameRequest createDebugGameRequest)
        {
            myGateway.Emit("Area.Debug.Create", createDebugGameRequest);
             
        }

    }

}