
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
            myScope.Model.Selection = new GameEditorSelectionScopeModel(){ShowGrid=true};
            myScope.Model.ToggleGrid = ToggleGridFn;
            myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.None;
            myScope.watch("model.selection.selectedSpace", () =>
                                                 {
                                                     if (myScope.Model.Selection.SelectedSpace == null) return;
                                                     myScope.Model.Selection.SelectedText = null;
                                                     myScope.Model.Selection.SelectedArea = null;
                                                     myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.Space;

                                                     foreach (var gameLayoutScenarioSpace in myScope.Model.Selection.SelectedScenario.Spaces)
                                                     {
                                                         if (gameLayoutScenarioSpace.SpaceGuid == myScope.Model.Selection.SelectedSpace.Guid)
                                                         {
                                                             myScope.Model.Selection.SelectedScenarioSpace =gameLayoutScenarioSpace;
                                                             break;
                                                         }
                                                     }

                                                 });
            myScope.watch("model.selection.selectedText", () =>
                                                {
                                                    if (myScope.Model.Selection.SelectedText == null) return;
                                                    myScope.Model.Selection.SelectedSpace = null;
                                                    myScope.Model.Selection.SelectedArea = null;
                                                    myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.Text;

                                                });
            myScope.watch("model.selection.selectedArea", () =>
                                                {
                                                    if (myScope.Model.Selection.SelectedArea == null) return;
                                                    myScope.Model.Selection.SelectedText = null;
                                                    myScope.Model.Selection.SelectedSpace = null;
                                                    myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.Area;
                                                });



            myScope.Model.AddText = AddTextFn;
            myScope.Model.AddArea = AddAreaFn;
            myScope.Model.AddSpace = AddSpaceFn;
            myScope.Model.RemoveArea = RemoveAreaFn;
            myScope.Model.RemoveSpace = RemoveSpaceFn;
            myScope.Model.RemoveText = RemoveTextFn;

            myScope.Model.OpenScenarios = OpenScenariosFn;

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
                _scope.Model = new TestGameControllerScopeModel();
                _scope.Model.Game = myScope.Model.Game;
                _scope.Model.Selection = myScope.Model.Selection;

            });


        }

        private void ToggleGridFn()
        {
            myScope.Model.Selection.ShowGrid = !myScope.Model.Selection.ShowGrid;
        }

        private void OpenScenariosFn()
        {
            myCreateUIService.CreateSingleton<GameScenarioEditorScope>("GameScenarioEditor", (_scope, elem) =>
            {
                _scope.Model = new GameScenarioEditorScopeModel();
                _scope.Model.Game = myScope.Model.Game;
                _scope.Model.Selection = myScope.Model.Selection;
            });
        }

        private void RemoveSpaceFn(GameSpaceModel arg)
        {
            myScope.Model.Game.GameLayout.Spaces.Remove(arg);
            myScope.Model.Selection.SelectedSpace = null;
            myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.None;
        }

        private void RemoveAreaFn(GameAreaModel arg)
        {
            myScope.Model.Game.GameLayout.Areas.Remove(arg);
            myScope.Model.Selection.SelectedArea = null;
            myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.None;
        }

        private void RemoveTextFn(GameTextModel arg)
        {
            myScope.Model.Game.GameLayout.Texts.Remove(arg);
            myScope.Model.Selection.SelectedText = null;
            myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.None;
        }


        private void AddSpaceFn()
        {
            var spaces = myScope.Model.Game.GameLayout.Spaces;

            spaces.Add(new GameSpaceModel()
                       {
                           Name = "Space" + (spaces.Count + 1),
                           LayoutType = GameSpaceLayoutType.Grow,
                           Guid = Guid.NewGuid(),
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