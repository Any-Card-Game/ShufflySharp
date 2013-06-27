using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
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
            myScope.watch("model.selectedGame",
                          () => {
                              uiManager.OpenGameEditor(myScope.Model.SelectedGame);
                          });
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
            myScope.Apply();

        }
    }
}