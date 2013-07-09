using ClientLibs.Managers;
using Models.DebugGameManagerModels;
using Models.GameManagerModels;
namespace Client.Services
{
    public class ClientDebugManagerService
    {
        private readonly ClientDebugManager clientDebugManager;

        public event ClientDebugManager.GetDebugLog OnGetDebugLog;
        public event ClientDebugManager.GetDebugBreak OnGetDebugBreak;
        public event ClientDebugManager.GameOver OnGameOver;

        public event ClientDebugManager.AskQuestion OnAskQuestion;
        public event ClientDebugManager.UpdateState OnUpdateState;
        public event ClientDebugManager.GameStarted OnGameStarted; 

        public ClientDebugManagerService(GatewayService gateway)
        {
            clientDebugManager = new ClientDebugManager(gateway.Gateway);
            clientDebugManager.OnGameOver += (user, model) => { if (OnGameOver != null) OnGameOver(user, model); };
            clientDebugManager.OnGetDebugBreak += (user, model) => { if (OnGetDebugBreak != null) OnGetDebugBreak(user, model); };
            clientDebugManager.OnGetDebugLog += (user, model) => { if (OnGetDebugLog != null) OnGetDebugLog(user, model); };
            clientDebugManager.OnAskQuestion += (user, model) => { if (OnAskQuestion != null) OnAskQuestion(user, model); };
            clientDebugManager.OnGameStarted += (user, model) => { if (OnGameStarted != null) OnGameStarted(user, model); };
            clientDebugManager.OnUpdateState += (user, model) => { if (OnUpdateState != null) OnUpdateState(user, model); };
            
        }
        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            clientDebugManager.AnswerQuestion(gameAnswerQuestionModel);
        }

        public void CreateGame(CreateDebugGameRequest createDebugGameRequest)
        {
            clientDebugManager.CreateGame(createDebugGameRequest);

        }
    }
}