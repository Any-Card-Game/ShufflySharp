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

        public LoginController(LoginScope scope, UIManagerService uiManager)
        {
            myScope = scope;
            myScope.Visible = true;
            myUIManager = uiManager;
            myScope.Model = new LoginModel();

            myScope.Model.WindowClosed = () =>
            {
                Window.Alert("woooo");
            };
            myScope.Model.LoginAccount = LoginAccountFn;
            myScope.Model.CreateAccount = CreateAccountFn;
            PageHandler.Handler.ClientSiteManager.OnLogin += (user, data) =>
            {
                PageHandler.Handler.ClientInfo.LoggedInUser = user;
                myUIManager.UserLoggedIn();
                scope.SwingAway(SwingDirection.Left, false);
            };
            

        }

        private void CreateAccountFn()
        {

            Window.Alert("Created! hahahJK");
        }

        private void LoginAccountFn()
        {

            PageHandler.Handler.ClientSiteManager.Login(myScope.Model.Username, myScope.Model.Password);

        }
    }
}