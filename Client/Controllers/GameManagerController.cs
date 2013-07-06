using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using Models;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Controllers
{
    internal class GameManagerController
    {
        private readonly GameManagerScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly MessageService myMessageService;

        public GameManagerController(GameManagerScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService,MessageService messageService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myScope.Model = new GameManagerModel();
            myScope.Visible = true;
            myClientSiteManagerService.GetGamesByUser(myUIManager.ClientInfo.LoggedInUser.Hash);

            myClientSiteManagerService.OnGetGamesByUserReceived += OnOnGetGamesByUserReceivedFn;
            myClientSiteManagerService.OnDeveloperCreateGameReceived += OnDeveloperCreateGameReceivedFn;
            myClientSiteManagerService.OnDoesGameNameExistReceived += OnDoesGameNameExistReceivedFn;

            myScope.Model.CreateGame += CreateGameFn;
            myScope.Model.DeleteGame += DeleteGameFn;
            myScope.watch("model.selectedGame",
                          () =>
                          {
                              if (myScope.Model.SelectedGame == null) return;
                              uiManager.OpenGameEditor(myScope.Model.SelectedGame);
                              if (!scope.Minimized)      
                              scope.Minimize();
                          });
        }

        private void DeleteGameFn()
        {
            myScope.Model.Games.Remove(myScope.Model.SelectedGame);
            myScope.Model.SelectedGame.Deleted = true;
            myClientSiteManagerService.DeveloperUpdateGame(myScope.Model.SelectedGame);

        }

        private void OnDoesGameNameExistReceivedFn(UserModel user, DoesGameExistResponse o)
        {
        

        }

        private void OnDeveloperCreateGameReceivedFn(UserModel user, DeveloperCreateGameResponse o)
        {
        

        }

        private void CreateGameFn()
        {
            myMessageService.PopupQuestion("Youre creating a game!","Game Name:",(name) => {
                                                                                    myClientSiteManagerService.DeveloperCreateGame(name);
                                                                                    myClientSiteManagerService.GetGamesByUser(myUIManager.ClientInfo.LoggedInUser.Hash);
            });
        }

        private void OnOnGetGamesByUserReceivedFn(UserModel user, GetGamesByUserResponse response)
        {
            myScope.Model.Games =  response.Games;
            myScope.Model.SelectedGame = myScope.Model.Games[0];
            myScope.Apply();

        }
    }
}