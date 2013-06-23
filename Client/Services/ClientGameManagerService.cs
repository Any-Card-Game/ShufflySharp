using ClientLibs.Managers;
using Models.GameManagerModels;
namespace Client.Services
{
    public class ClientGameManagerService
    {
        private readonly ClientGameManager clientGameManager;

        public event ClientGameManager.AskQuestion OnAskQuestion;
        public event ClientGameManager.UpdateState OnUpdateState;
        public event ClientGameManager.GameStarted OnGameStarted;
        public event ClientGameManager.GameOver OnGameOver; 


        public ClientGameManagerService(GatewayService gateway)
        {
            clientGameManager = new ClientGameManager(gateway.Gateway);
            clientGameManager.OnAskQuestion += (user, model) => { if (OnAskQuestion != null) OnAskQuestion(user, model); };
            clientGameManager.OnGameOver += (user, model) => { if (OnGameOver != null) OnGameOver(user, model); };
            clientGameManager.OnGameStarted += (user, model) => { if (OnGameStarted != null) OnGameStarted(user, model); };
            clientGameManager.OnUpdateState += (user, model) => { if (OnUpdateState != null) OnUpdateState(user, model); };
        }



        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            clientGameManager.AnswerQuestion(gameAnswerQuestionModel);
        }

    }
}