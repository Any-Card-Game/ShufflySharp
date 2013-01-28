using Client.Libs;
using Models;
using Models.SiteManagerModels;
namespace Client.Managers
{
    public class ClientSiteManager
    {
        #region Delegates

        public delegate void UserLogin(UserLoginResponse o);
        public delegate void GetGameTypesReceived(GetGameTypesReceivedResponse o);
        public delegate void GetRoomsReceived(GetRoomsResponse o);

        #endregion

        private readonly Gateway myGateway;
        public string GameServer { get; set; }
        public event GetGameTypesReceived OnGetGameTypesReceived; 

        public ClientSiteManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event UserLogin OnLogin;
        public event GetRoomsReceived OnGetRoomsReceived;
        

        private void Setup()
        {
            myGateway.On("Area.Main.Login.Response",
                         a => {
                             UserLoginResponse userLoginResponse = (UserLoginResponse) a;
                             if (userLoginResponse.Successful)
                                 SiteLogin(userLoginResponse.User.Hash);
                         });

            myGateway.On("Area.Site.Login.Response", a => { OnLogin(((UserLoginResponse)a)); });
            myGateway.On("Area.Site.GetGameTypes.Response", a => { OnGetGameTypesReceived(((GetGameTypesReceivedResponse)a)); });
            myGateway.On("Area.Site.GetRooms.Response", a => { OnGetRoomsReceived(((GetRoomsResponse)a)); });
        }

        private void SiteLogin(string hash)
        {
            myGateway.Emit("Area.Site.Login", new SiteLoginRequest(hash), GameServer);
        }

        public void Login(string userName, string password)
        {
            myGateway.Login(userName, password);
        }
 
        public void GetGameTypes()
        {
            myGateway.Emit("Area.Site.GetGameTypes");
        }

        public void GetRooms(GetRoomsRequest getRoomsRequest)
        {
            myGateway.Emit("Area.Site.GetRooms", getRoomsRequest, GameServer);

        }
    }
}