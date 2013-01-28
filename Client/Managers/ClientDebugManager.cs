using Client.Libs;
using Models.GameManagerModels;
namespace Client.Managers
{
    public class ClientDebugManager
    {
        #region Delegates

        public delegate void GetGameSource(GameSourceResponseModel o);

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
            myGateway.On("Area.Debug.GetGameSource.Response", a => OnGetGameSource((GameSourceResponseModel) a));
        }

        public void RequestGameSource(GameSourceRequestModel gameSourceRequestModel)
        {
            myGateway.Emit("Area.Debug2.GetGameSource.Request", gameSourceRequestModel);
        }
    }
}