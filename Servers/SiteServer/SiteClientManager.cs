using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace SiteServer
{

    public class SiteClientManager
    {
        public delegate void UserLogin(UserModel user,SiteLoginRequest data);

        private QueueManager qManager;

        public string SiteServerIndex { get; set; }

        public SiteClientManager(string siteServerIndex)
        {
            SiteServerIndex = siteServerIndex;

            Setup();
        }
        public event UserLogin OnUserLogin;

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
            qManager.AddChannel("Area.Site.Login", (user, data) => OnUserLogin(user, (SiteLoginRequest)data));
             
        }

        public void SendLoginResponse(UserModel user)
        {
            qManager.SendMessage(user, user.Gateway, "Area.Site.Login.Response", new {});
        }
    }
}