using ClientLibs.Managers;
using Models.DebugGameManagerModels;
using Models.GameManagerModels;

namespace Client.Services
{
    public class ClientDebugManagerService
    {
        public const string Name = "ClientDebugManagerService";
        private readonly ClientDebugManager clientDebugManager;

        public ClientDebugManagerService(GatewayService gateway)
        {
            clientDebugManager = new ClientDebugManager(gateway.Gateway);
            clientDebugManager.OnGameOver += (user, model) => OnGameOver.Trigger(user, model);
            clientDebugManager.OnGetDebugBreak += (user, model) => OnGetDebugBreak.Trigger(user, model);
            clientDebugManager.OnGetDebugLog += (user, model) => OnGetDebugLog.Trigger(user,model);
            clientDebugManager.OnAskQuestion += (user, model) => OnAskQuestion.Trigger(user, model);
            clientDebugManager.OnGameStarted += (user, model) => OnGameStarted.Trigger(user, model);
            clientDebugManager.OnUpdateState += (user, model) => OnUpdateState.Trigger(user, model);
        }


        public UserEventCacher<DebugGameLogModel> OnGetDebugLog=new UserEventCacher<DebugGameLogModel>();
        public UserEventCacher<DebugGameBreakModel> OnGetDebugBreak=new UserEventCacher<DebugGameBreakModel>();
        public UserEventCacher<string> OnUpdateState=new UserEventCacher<string>();
        public UserEventCacher<GameRoomModel> OnGameStarted=new UserEventCacher<GameRoomModel>();
        public UserEventCacher<string> OnGameOver=new UserEventCacher<string>();
        public UserEventCacher<GameSendAnswerModel> OnAskQuestion=new UserEventCacher<GameSendAnswerModel>();


        public void AnswerQuestion(GameAnswerQuestionModel gameAnswerQuestionModel)
        {
            clientDebugManager.AnswerQuestion(gameAnswerQuestionModel);
        }
        public void ModifySource(ModifySourceRequest modifySourceRequest)
        {
            clientDebugManager.ModifySource(modifySourceRequest);
        }

        public void CreateGame(CreateDebugGameRequest createDebugGameRequest)
        {
            clientDebugManager.CreateGame(createDebugGameRequest);
        }
        public void DestroyGame(DestroyDebugGameRequest destroyDebugGameRequest)
        {
            clientDebugManager.DestroyGame(destroyDebugGameRequest);
        }
    }
}