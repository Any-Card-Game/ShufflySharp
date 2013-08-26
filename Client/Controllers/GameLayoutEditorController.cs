using System.Collections.Generic;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using Models;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;

namespace Client.Controllers
{
    internal class GameLayoutEditorController
    {
        public const string Name = "GameLayoutEditorController";
        public const string View = "GameLayoutEditor";
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly CreateUIService myCreateUIService;
        private readonly MessageService myMessageService;
        private readonly GameLayoutEditorScope myScope;
        private CreatedUI<GameScenarioEditorScope> scenario;

        public GameLayoutEditorController(GameLayoutEditorScope scope,
            ClientSiteManagerService clientSiteManagerService, MessageService messageService,
            CreateUIService createUIService)
        {
            myScope = scope;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Visible = true;
            myScope.Model.ToggleGrid = ToggleGridFn;
            myScope.Model.ToggleCards = ToggleCardsFn;
            myScope.Model.AddText = AddTextFn;
            myScope.Model.AddArea = AddAreaFn;
            myScope.Model.AddSpace = AddSpaceFn;
            myScope.Model.RemoveArea = RemoveAreaFn;
            myScope.Model.RemoveSpace = RemoveSpaceFn;
            myScope.Model.RemoveText = RemoveTextFn;
            myScope.Model.OpenScenarios = OpenScenariosFn;
            myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.None;
            myScope.watch("model.selection.selectedSpace", () =>
                                                           {
                                                               if (myScope.Model.Selection.SelectedSpace == null)
                                                                   return;
                                                               myScope.Model.Selection.SelectedText = null;
                                                               myScope.Model.Selection.SelectedArea = null;
                                                               myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.Space;
                                                               myScope.Model.Selection.SelectedCard = null;
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
            myScope.watch("model.game", () => { myScope.Model.UpdateStatus = UpdateStatusType.Dirty; }, true);
            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;

            var testgame = myCreateUIService.CreateSingleton<TestGameControllerScope>(TestGameController.View, (_scope, elem) =>
                                                                                                            {
                                                                                                                _scope.Model = new TestGameControllerScopeModel();
                                                                                                                _scope.Model.Game = myScope.Model.Game;
                                                                                                                _scope.Model.Selection = myScope.Model.Selection;
                                                                                                            });
            myScope.OnClose += () =>
                               {
                                   testgame.Destroy();
                                   if (scenario != null)
                                   {
                                       scenario.Destroy();
                                   }
                               };

        }


        private void ToggleCardsFn()
        {
            myScope.Model.Selection.ShowCards = !myScope.Model.Selection.ShowCards;
        }

        private void ToggleGridFn()
        {
            myScope.Model.Selection.ShowGrid = !myScope.Model.Selection.ShowGrid;
        }

        private void OpenScenariosFn()
        {
         scenario=   myCreateUIService.CreateSingleton<GameScenarioEditorScope>(GameScenarioEditorController.View, (_scope, elem) =>
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
            SureUpScenarios(myScope.Model.Game);
        }

        private void RemoveAreaFn(GameAreaModel arg)
        {
            myScope.Model.Game.GameLayout.Areas.Remove(arg);
            myScope.Model.Selection.SelectedArea = null;
            myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.None;
            SureUpScenarios(myScope.Model.Game);
        }

        private void RemoveTextFn(GameTextModel arg)
        {
            myScope.Model.Game.GameLayout.Texts.Remove(arg);
            myScope.Model.Selection.SelectedText = null;
            myScope.Model.Selection.SelectedLayoutPiece = SelectedGameLayoutPiece.None;
            SureUpScenarios(myScope.Model.Game);
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
            SureUpScenarios(myScope.Model.Game);
        }

        public static void SureUpScenarios(GameModel gameModel)
        {
            foreach (var gameLayoutScenario in gameModel.GameLayoutScenarios)
            {
                foreach (var gameSpaceModel in gameModel.GameLayout.Spaces)
                {
                    if (gameLayoutScenario.Spaces.Filter(a => a.SpaceGuid == gameSpaceModel.Guid).Count == 0)
                    {
                        var defaultCards = new List<GameLayoutScenarioCard>()
                                           {
                                               new GameLayoutScenarioCard()
                                               {
                                                   CardGuid = Guid.NewGuid(),
                                                   Type = 1,
                                                   Value = 5,
                                                   State = GameLayoutCardState.FaceDown
                                               },
                                               new GameLayoutScenarioCard()
                                               {
                                                   CardGuid = Guid.NewGuid(),
                                                   Type = 1,
                                                   Value = 5,
                                                   State = GameLayoutCardState.FaceUp
                                               },
                                               new GameLayoutScenarioCard()
                                               {
                                                   CardGuid = Guid.NewGuid(),
                                                   Type = 1,
                                                   Value = 5,
                                                   State = GameLayoutCardState.FaceDown
                                               },
                                               new GameLayoutScenarioCard()
                                               {
                                                   CardGuid = Guid.NewGuid(),
                                                   Type = 1,
                                                   Value = 5,
                                                   State = GameLayoutCardState.FaceUp
                                               },
                                               new GameLayoutScenarioCard()
                                               {
                                                   CardGuid = Guid.NewGuid(),
                                                   Type = 1,
                                                   Value = 5,
                                                   State = GameLayoutCardState.FaceDown
                                               },
                                               new GameLayoutScenarioCard()
                                               {
                                                   CardGuid = Guid.NewGuid(),
                                                   Type = 1,
                                                   Value = 5,
                                                   State = GameLayoutCardState.FaceUp
                                               },
                                           };
                        gameLayoutScenario.Spaces.Add(new GameLayoutScenarioSpace()
                                                      {
                                                          SpaceGuid = gameSpaceModel.Guid,
                                                          Cards = defaultCards
                                                      });
                    }
                }


                foreach (var gameSpaceModel in gameLayoutScenario.Spaces)
                {
                    if (gameModel.GameLayout.Spaces.Filter(a => a.Guid == gameSpaceModel.SpaceGuid).Count == 0)
                    {
                        gameLayoutScenario.Spaces.Remove(gameSpaceModel);
                    }
                }


                foreach (var gameEffectModel in gameModel.Effects)
                {
                    if (gameLayoutScenario.Effects.Filter(a => a.EffectGuid == gameEffectModel.Guid).Count == 0)
                    {
                        gameLayoutScenario.Effects.Add(new GameLayoutScenarioEffect()
                                                       {
                                                           EffectGuid = gameEffectModel.Guid,
                                                           AreaGuids = new List<string>(),
                                                           TextGuids = new List<string>(),
                                                           SpaceGuids = new List<string>(),
                                                           CardGuids = new List<string>(),
                                                       });
                    }
                }
                foreach (var gameEffectModel in gameLayoutScenario.Effects)
                {
                    if (gameModel.Effects.Filter(a => a.Guid == gameEffectModel.EffectGuid).Count == 0)
                    {
                        gameLayoutScenario.Effects.Remove(gameEffectModel);
                    }
                }
            }
        }

        private void AddAreaFn()
        {
            var areas = myScope.Model.Game.GameLayout.Areas;

            areas.Add(new GameAreaModel()
                      {
                          Guid = Guid.NewGuid(),
                          Name = "Area" + (areas.Count + 1),
                          Left = 0,
                          Top = 0,
                          Width = 1,
                          Height = 1
                      });
            SureUpScenarios(myScope.Model.Game);
        }

        private void AddTextFn()
        {
            var texts = myScope.Model.Game.GameLayout.Texts;

            texts.Add(new GameTextModel()
                      {
                          Guid = Guid.NewGuid(),
                          Name = "Text" + (texts.Count + 1),
                          Left = 0,
                          Top = 0,
                      });
            SureUpScenarios(myScope.Model.Game);
        }

        private void OnDeveloperUpdateGameReceivedFn(UserModel user, DeveloperUpdateGameResponse o)
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