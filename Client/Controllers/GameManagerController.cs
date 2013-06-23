using System;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Models;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Controllers
{
    internal class GameManagerController
    {
        private readonly GameManagerScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;

        public GameManagerController(GameManagerScope scope, UIManagerService uiManager,ClientSiteManagerService clientSiteManagerService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myScope .Model= new GameManagerModel();
            myScope.Visible = true;
            myClientSiteManagerService.GetGamesByUser(myUIManager.ClientInfo.LoggedInUser.Hash);

            myClientSiteManagerService.OnGetGamesByUserReceived+=OnOnGetGamesByUserReceivedFn;

        }

        private void OnOnGetGamesByUserReceivedFn(UserModel user, GetGamesByUserResponse response)
        {
            
        }
    }
}