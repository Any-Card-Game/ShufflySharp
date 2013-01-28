using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace SiteServer
{
    public class SiteClientManager
    {
        #region Delegates

        public delegate void UserLogin(UserModel user, SiteLoginRequest data);
        public delegate void GetGameTypes(UserModel user);
        public delegate void GetRooms(UserModel user,GetRoomsRequest data);

        #endregion

        private QueueManager qManager;
        public string SiteServerIndex { get; set; }

        public SiteClientManager(string siteServerIndex)
        {
            SiteServerIndex = siteServerIndex;

            Setup();
        }

        public event UserLogin OnUserLogin;
        public event GetGameTypes OnGetGameTypes;
        public event GetRooms OnGetRooms;

        private void Setup()
        {
            qManager = new QueueManager(SiteServerIndex,
                                        new QueueManagerOptions(new[] {
                                                                              new QueueWatcher("SiteServer", null),
                                                                              new QueueWatcher(SiteServerIndex, null),
                                                                      },
                                                                new[] {
                                                                              "SiteServer",
                                                                              "GatewayServer",
                                                                              "Gateway*"
                                                                      }));
            qManager.AddChannel("Area.Site.Login", (user, data) => OnUserLogin(user, (SiteLoginRequest) data));
            qManager.AddChannel("Area.Site.GetGameTypes", (user, data) => OnGetGameTypes(user));
            qManager.AddChannel("Area.Site.GetRooms", (user, data) => OnGetRooms(user, (GetRoomsRequest)data));
        }

        public void SendLoginResponse(UserModel user)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.Login.Response", new UserLoginResponse(true, user));
        }

        public void SendGameTypes(UserModel user, GetGameTypesReceivedResponse gameTypes)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetGameTypes.Response", gameTypes);
        }

        public void SendRooms(UserModel user, GetRoomsResponse response)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.GetRooms.Response", response);


        }
    }
}