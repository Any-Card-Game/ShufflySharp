using Models;
using Models.SiteManagerModels;
namespace Client
{
    public class ClientSiteManager
    {
        public delegate void UserLogin(UserLoginResponse o);

        private readonly Gateway myGateway;
        public string GameServer { get; set; }

        public ClientSiteManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event UserLogin OnLogin;

        private void Setup()
        {

            myGateway.On("Area.Main.Login.Response", a =>
            {
                UserLoginResponse userLoginResponse = (UserLoginResponse)a;
                if (userLoginResponse.Successful)
                {
                    SiteLogin(userLoginResponse.Hash);
                }
            });

            myGateway.On("Area.Site.Login.Response", a =>
            {
                OnLogin(((UserLoginResponse)a));
            });
        }

        private void SiteLogin(string hash)
        {
            myGateway.Emit("Area.Site.Login", new SiteLoginRequest(hash), GameServer);


        }

        public void Login(string userName, string password)
        {
            myGateway.Login(userName, password);
        }

        public void GetGameList()
        {
            myGateway.Emit("Area.Game.GetGames", null, GameServer);
        }

    }
}