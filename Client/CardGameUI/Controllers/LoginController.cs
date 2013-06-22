using System.Html;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using Client;
using WebLibraries.ShuffUI.ShuffUI;
namespace CardGameUI.Controllers
{
    internal class LoginController
    {
        private readonly LoginScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myclientSiteManagerService;

        public LoginController(LoginScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService)
        {
            myScope = scope;
            myScope.Visible = true;
            myUIManager = uiManager;
            myclientSiteManagerService = clientSiteManagerService;
            myScope.Model = new LoginModel();

            myScope.Model.WindowClosed = () =>
            {
                Window.Alert("woooo");
            };
            myScope.Model.LoginAccount = LoginAccountFn;
            myScope.Model.CreateAccount = CreateAccountFn;
            myclientSiteManagerService.OnLogin += (user, data) =>
            {
                uiManager.ClientInfo.LoggedInUser = user;
                myUIManager.UserLoggedIn();
                scope.SwingAway(SwingDirection.Left, false, null);
            };
            

        }

        private void CreateAccountFn()
        {

            Window.Alert("Created! hahahJK");
        }

        private void LoginAccountFn()
        {

            myclientSiteManagerService.Login(myScope.Model.Username, myScope.Model.Password);

        }
    }
}