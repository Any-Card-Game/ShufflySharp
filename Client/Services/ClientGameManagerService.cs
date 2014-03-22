using ClientLibs.Managers; 
using Models.GameManagerModels;

namespace Client.Services
{
    public class ClientGameManagerService
    {
        public const string Name = "ClientGameManagerService";
        private readonly ClientGameManager clientGameManager;

        public ClientGameManagerService(GatewayService gateway)
        {
            clientGameManager = new ClientGameManager(gateway.Gateway);
            clientGameManager.OnAskQuestion += (user, model) =>
            {
                OnAskQuestion.Trigger(user, model);
            };
            clientGameManager.OnGameOver += (user, model) => OnGameOver.Trigger(user, model);
            clientGameManager.OnGameStarted += (user, model) => OnGameStarted.Trigger(user, model);
            clientGameManager.OnUpdateState += (user, model) => OnUpdateState.Trigger(user, model);
        }

        public UserEventCacher<GameSendAnswerModel> OnAskQuestion = new UserEventCacher<GameSendAnswerModel>();
        public UserEventCacher<string> OnUpdateState = new UserEventCacher<string>();
        public UserEventCacher<GameRoomModel> OnGameStarted = new UserEventCacher<GameRoomModel>();
        public UserEventCacher<string> OnGameOver = new UserEventCacher<string>();

        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            clientGameManager.AnswerQuestion(gameAnswerQuestionModel);

        }
    }
}