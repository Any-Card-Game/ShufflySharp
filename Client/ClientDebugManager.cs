using Models;
using Models.GameManagerModels;
namespace Client
{
    public class ClientDebugManager
    { 
        public delegate void GetGameSource(GameSourceResponseModel o);
         
        private readonly Gateway myGateway; 

        public ClientDebugManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }
        public event GetGameSource OnGetGameSource;

        private void Setup()
        {
            myGateway.On("Area.Debug.GetGameSource.Response", a => OnGetGameSource((GameSourceResponseModel)a));

        }

        public void RequestGameSource(GameSourceRequestModel gameSourceRequestModel)
        {
            myGateway.Emit("Area.Debug2.GetGameSource.Request", gameSourceRequestModel);
        }
         
    }
}