using Models;
using Models.GameManagerModels;
namespace ClientLibs.Managers
{
    public class ClientGameManager
    {
        #region Delegates

        public delegate void AskQuestion(UserModel user, GameSendAnswerModel o);
        public delegate void GameOver(UserModel user, string o);
        public delegate void GameStarted(UserModel user, GameRoomModel o);
        public delegate void UpdateState(UserModel user, string o);

        #endregion

        private readonly Gateway myGateway;

        public ClientGameManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }
         
        public event AskQuestion OnAskQuestion;
        public event UpdateState OnUpdateState;
        public event GameStarted OnGameStarted;
        public event GameOver OnGameOver; 

        private void Setup()
        {
            myGateway.On("Area.Game.AskQuestion", (user, data) => OnAskQuestion(user, (GameSendAnswerModel)data));
            myGateway.On("Area.Game.UpdateState", (user, data) => OnUpdateState(user, (string)data));
            myGateway.On("Area.Game.Started", (user, data) => OnGameStarted(user, (GameRoomModel)data));
            myGateway.On("Area.Game.GameOver", (user, data) => OnGameOver(user, (string)data));
        }

        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            myGateway.Emit("Area.Game.AnswerQuestion", gameAnswerQuestionModel);
        }
    }


     
}