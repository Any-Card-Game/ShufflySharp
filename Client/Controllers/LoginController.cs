using System;
using System.Html;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using CommonLibraries;
using Models;

namespace Client.Controllers
{
    internal class LoginController
    {
        public const string Name = "LoginController";
        public const string View = "Login";
        private readonly CreateUIService myCreateUIService;
        private readonly ClientManagerService clientManagerService;
        private readonly MessageService myMessageService;
        private readonly LoginScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myclientSiteManagerService;

        public LoginController(LoginScope scope, UIManagerService uiManager,
            ClientSiteManagerService clientSiteManagerService, MessageService messageService,
            CreateUIService createUIService, ClientManagerService clientManagerService)
        {
            myScope = scope;
            myScope.Visible = true;
            myUIManager = uiManager;
            myclientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            this.clientManagerService = clientManagerService;
            myScope.Model = new LoginScopeModel();
/*
            scope.Model.dosomething += (o) =>
            {
                Console.WriteLine(o);
            };
*/

            myScope.Model.WindowClosed = () => { Window.Alert("woooo"); };
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

                myCreateUIService.CreateSingleton(HomeController.View);
                myScope.SwingAway(SwingDirection.Left, false, null);
            }
            else
            {
                myMessageService.PopupOkay("Bad!", "You no login!", () => { });
            }
        }

        private void OnUserCreateFn(UserModel user, UserCreateResponse o)
        {
            if (o.Successful)
            {
                myUIManager.ClientInfo.LoggedInUser = user;
                myCreateUIService.CreateSingleton(HomeController.View);
                myScope.SwingAway(SwingDirection.Left, false, null);
            }
            else
            {
                myMessageService.PopupOkay("Bad!", "You no create! It exist! What up!!?", () => { });
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