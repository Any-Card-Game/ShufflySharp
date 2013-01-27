using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using Models.SiteManagerModels;
namespace SiteServer
{
    public class SiteManager
    {
        private DataManager dataManager;
        private SiteClientManager myServerManager;

        public SiteManager(string siteServerIndex)
        {
            myServerManager = new SiteClientManager(siteServerIndex);

            dataManager = new DataManager();

            myServerManager.OnUserLogin += OnUserLogin;
        }

        private void OnUserLogin(UserModel user, SiteLoginRequest data)
        {
            Console.Log(user.UserName + "  " + data.Hash + "    We did it!");

            myServerManager.SendLoginResponse(user);
        }
    }
}