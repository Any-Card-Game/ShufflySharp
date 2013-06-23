using System.Html;
using Client.Scope;
using Client.Services;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Controllers
{
    internal class LoginController
    {
        private readonly LoginScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myclientSiteManagerService;
        private readonly MessageService myMessageService;

        public LoginController(LoginScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService,MessageService messageService)
        {
            myScope = scope;
            myScope.Visible = true;
            myUIManager = uiManager;
            myclientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myScope.Model = new LoginModel();

            myScope.Model.WindowClosed = () =>
            {
                Window.Alert("woooo");
            };
            myScope.Model.LoginAccount = LoginAccountFn;
            myScope.Model.CreateAccount = CreateAccountFn;
            myclientSiteManagerService.OnLogin += (user, data) =>
            {
                if (data.Successful) {
                    uiManager.ClientInfo.LoggedInUser = user;
                    myUIManager.UserLoggedIn();
                    scope.SwingAway(SwingDirection.Left, false, null);
                } else {
                    myMessageService.PopupOkay("Bad!","You no login!",() => {
                                                                          
                                                                      });
                }
            };
            myclientSiteManagerService.OnUserCreate += OnUserCreateFn;

        }

        void OnUserCreateFn(Models.UserModel user, Models.UserCreateResponse o)
        {
            if (o.Successful) {
                myUIManager.ClientInfo.LoggedInUser = user;
                myUIManager.UserLoggedIn();
                myScope.SwingAway(SwingDirection.Left, false, null);

            } else {
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