using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Scope.Directive; 
using Client.Services;
using Models;
 
namespace Client.Controllers
{
    internal class LoginController
    {
        private readonly LoginScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myclientSiteManagerService;
        private readonly MessageService myMessageService;
        private readonly CreateUIService myCreateUIService;

        public LoginController(LoginScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService, MessageService messageService, CreateUIService createUIService)
        {
            myScope = scope;
            myScope.Visible = true;
            myUIManager = uiManager;
            myclientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Model = new LoginScopeModel();

            myScope.Model.WindowClosed = () =>
            {
                Window.Alert("woooo");
            };
            myScope.Model.LoginAccount = LoginAccountFn;
            myScope.Model.CreateAccount = CreateAccountFn;
            myclientSiteManagerService.OnLogin += OnLoginFn;
            myclientSiteManagerService.OnUserCreate += OnUserCreateFn;

           /* myScope.Model.Username = "dested1";
            myScope.Model.Password = "d";

            Window.SetTimeout(LoginAccountFn, 1000);*/

        }

        private void OnLoginFn(UserModel user, UserLoginResponse data)
        {

            if (data.Successful)
            {
                myUIManager.ClientInfo.LoggedInUser = user;
                myUIManager.UserLoggedIn();
                myScope.SwingAway(SwingDirection.Left, false, null);
            }
            else
            {
                myMessageService.PopupOkay("Bad!", "You no login!", () =>
                {

                });
            }

        }

        void OnUserCreateFn(UserModel user, UserCreateResponse o)
        {
            if (o.Successful)
            {
                myUIManager.ClientInfo.LoggedInUser = user;
                myUIManager.UserLoggedIn();
                myScope.SwingAway(SwingDirection.Left, false, null); 
            }
            else
            {
                myMessageService.PopupOkay("Bad!", "You no create! It exist! What up!!?", () =>
                {
                });

            }
        }

        private void CreateAccountFn()
        {
            myclientSiteManagerService.CreateUser(myScope.Model.Username, myScope.Model.Password);
        }

        private void LoginAccountFn()
        {

            myclientSiteManagerService.Login(myScope.Model.Username, myScope.Model.Password);

        }
    }
}