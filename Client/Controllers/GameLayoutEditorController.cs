
using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using global;
using Models;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Controllers
{
    internal class GameLayoutEditorController
    {
        private readonly GameLayoutEditorScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly MessageService myMessageService;
        private readonly CreateUIService myCreateUIService;

        public GameLayoutEditorController(GameLayoutEditorScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService, MessageService messageService, CreateUIService createUIService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Visible = true;
            myScope.Model.SelectedPiece = SelectedGameLayoutPiece.None;
            myScope.watch("model.selectedSpace", () =>
                                                 {
                                                     if (myScope.Model.SelectedSpace == null) return;
                                                     myScope.Model.SelectedText = null;
                                                     myScope.Model.SelectedArea = null;
                                                     myScope.Model.SelectedPiece = SelectedGameLayoutPiece.Space;
                                                 });
            myScope.watch("model.selectedText", () =>
                                                {
                                                    if (myScope.Model.SelectedText == null) return;
                                                    myScope.Model.SelectedSpace = null;
                                                    myScope.Model.SelectedArea = null;
                                                    myScope.Model.SelectedPiece = SelectedGameLayoutPiece.Text;

                                                });
            myScope.watch("model.selectedArea", () =>
                                                {
                                                    if (myScope.Model.SelectedArea == null) return;
                                                    myScope.Model.SelectedText = null;
                                                    myScope.Model.SelectedSpace = null;
                                                    myScope.Model.SelectedPiece = SelectedGameLayoutPiece.Area;
                                                });



            myScope.Model.AddText = AddTextFn;
            myScope.Model.AddArea = AddAreaFn;
            myScope.Model.AddSpace = AddSpaceFn;


            myScope.watch("model.game",
                       () =>
                       {
                           myScope.Model.UpdateStatus = UpdateStatusType.Dirty;
                       },
                       true);
            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;

            myCreateUIService.CreateSingleton<TestGameControllerScope>("TestGameUI", (_scope, elem) =>
            {
                _scope.Model =new TestGameControllerScopeModel();
                _scope.Model.MainLayout = myScope.Model.Game.GameLayout;

            });


        }
         

        private void AddSpaceFn()
        {
            var spaces = myScope.Model.Game.GameLayout.Spaces;

            spaces.Add(new GameSpaceModel()
                       {
                           Name = "Space" + (spaces.Count + 1),
                           LayoutType = GameSpaceLayoutType.Straight,
                           Left = 0,
                           Top = 0,
                           Height = 1,
                           Width = 1
                       });
        }

        private void AddAreaFn()
        {
            var areas = myScope.Model.Game.GameLayout.Areas;

            areas.Add(new GameAreaModel()
            {
                Name = "Area" + (areas.Count + 1),
                Left = 0,
                Top = 0,
            });
        }

        private void AddTextFn()
        {
            var texts = myScope.Model.Game.GameLayout.Texts;

            texts.Add(new GameTextModel()
            {
                Name = "Text" + (texts.Count + 1),
                Left = 0,
                Top = 0,
            });
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