using Client.Libs;
using Models;
using Models.GameManagerModels;
namespace Client.Managers
{
    public class ClientDebugManager
    {
        #region Delegates

        public delegate void GetGameSource(UserModel user, GameSourceResponseModel o);

        #endregion

        private readonly Gateway myGateway;

        public ClientDebugManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event GetGameSource OnGetGameSource;

        private void Setup()
        {
            myGateway.On("Area.Debug.GetGameSource.Response", (user, data) => OnGetGameSource(user, (GameSourceResponseModel) data));
        }

        public void RequestGameSource(GameSourceRequestModel gameSourceRequestModel)
        {
            myGateway.Emit("Area.Debug2.GetGameSource.Request", gameSourceRequestModel);
        }
    }
}