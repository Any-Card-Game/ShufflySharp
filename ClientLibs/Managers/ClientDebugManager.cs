using Models;
using Models.GameManagerModels;
namespace ClientLibs.Managers
{
    public class ClientDebugManager
    {
                #region Delegates

        public delegate void DebugGameOver(UserModel user, string o);
        public delegate void GetDebugBreak(UserModel user, GameAnswerModel o);
        public delegate void GetDebugLog(UserModel user, GameAnswerModel o);
        public delegate void GetGameSource(UserModel user, GameSourceResponseModel o);

        #endregion

        private readonly Gateway myGateway;

        public ClientDebugManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event GetGameSource OnGetGameSource;
        public event GetDebugLog OnGetDebugLog;
        public event GetDebugBreak OnGetDebugBreak; 
        public event DebugGameOver OnDebugGameOver;

        private void Setup()
        {
            myGateway.On("Area.Debug.GetGameSource.Response", (user, data) => OnGetGameSource(user, (GameSourceResponseModel) data));
            
            myGateway.On("Area.Debug.Log", (user, data) => OnGetDebugLog(user, (GameAnswerModel)data));
            myGateway.On("Area.Debug.Break", (user, data) => OnGetDebugBreak(user, (GameAnswerModel)data));
            myGateway.On("Area.Debug.GameOver", (user, data) => OnDebugGameOver(user, (string)data));
        }

        public void RequestGameSource(GameSourceRequestModel gameSourceRequestModel)
        {
            myGateway.Emit("Area.Debug2.GetGameSource.Request", gameSourceRequestModel);
        }
    }
}