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
    internal class GameEditorController
    {
        private readonly GameEditorScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly MessageService myMessageService;
        private readonly CreateUIService myCreateUIService;

        public GameEditorController(GameEditorScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService, MessageService messageService,CreateUIService createUIService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Model = new GameEditorModel();
            myScope.Model.UpdateGame = UpdateGameFn;
            myScope.Model.OpenCode = OpenCodeFn;
            myScope.Model.OpenEffects = OpenEffectsFn;
            myScope.Model.OpenLayout = OpenLayoutFn;
            myScope.Model.OpenTest = OpenTestFn;
            myScope.Visible = false;
            uiManager.OpenGameEditor += (game) =>
            {
                myScope.Visible = true;

                myScope.SwingAway(SwingDirection.TopRight, true, null);
                myScope.SwingBack(null);
                myScope.Model.Game = game;
            };
            myScope.watch("model.game",
                          () => {
                              myScope.Model.UpdateStatus = UpdateStatusType.Dirty;
                          },
                          true);
            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;

        }

        private void OpenTestFn()
        {
        }

        private void OpenLayoutFn()
        {
        }

        private void OpenEffectsFn()
        {
        }

        private void OpenCodeFn()
        {
            myCreateUIService.Create<GameEditorScope>("GameCodeEditor");
        }

        void OnDeveloperUpdateGameReceivedFn(UserModel user, DeveloperUpdateGameResponse o)
        {
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Apply();

        }

        private void UpdateGameFn()
        {
            myScope.Model.UpdateStatus = UpdateStatusType.Syncing;
        
            myClientSiteManagerService.DeveloperUpdateGame(myScope.Model.Game);
        }
    }
}