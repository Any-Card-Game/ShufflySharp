using System;
using System.Collections.Generic;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using Models;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;

namespace Client.Controllers
{
    internal class GameScenarioEditorController
    {
        public const string Name = "GameScenarioEditorController";
        public const string View = "GameScenarioEditor";
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly CreateUIService myCreateUIService;
        private readonly MessageService myMessageService;
        private readonly GameScenarioEditorScope myScope;

        public GameScenarioEditorController(GameScenarioEditorScope scope,
            ClientSiteManagerService clientSiteManagerService, MessageService messageService,
            CreateUIService createUIService)
        {
            myScope = scope;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Visible = true;

            myScope.watch("model.game",
                () => { myScope.Model.UpdateStatus = UpdateStatusType.Dirty; },
                true);

            myScope.watch("model.selection.selectedScenario", () =>
                                                              {
                                                                  if (myScope.Model.Selection.SelectedScenario == null)
                                                                      return;
                                                                  myScope.Model.Selection.SelectedScenarioEffect = null;
                                                                  myScope.Model.Selection.SelectedScenarioSpace = null;
                                                                  if (myScope.Model.Selection.SelectedSpace == null)
                                                                      return;

                                                                  foreach (
                                                                      var gameLayoutScenarioSpace in
                                                                          myScope.Model.Selection.SelectedScenario
                                                                              .Spaces)
                                                                  {
                                                                      if (gameLayoutScenarioSpace.SpaceGuid ==
                                                                          myScope.Model.Selection.SelectedSpace.Guid)
                                                                      {
                                                                          myScope.Model.Selection.SelectedScenarioSpace
                                                                              = gameLayoutScenarioSpace;
                                                                          break;
                                                                      }
                                                                  }
                                                              });

            myScope.watch("model.selection.selectedScenarioSpace", () =>
                                                                   {
                                                                       if (
                                                                           myScope.Model.Selection.SelectedScenarioSpace ==
                                                                           null) return;
                                                                       myScope.Model.Selection.SelectedScenarioEffect =
                                                                           null;
                                                                       myScope.Model.Selection.SelectedScenarioPiece =
                                                                           SelectedGameScenarioPiece.Space;
                                                                   });
            myScope.watch("model.selection.selectedScenarioEffect", () =>
                                                                    {
                                                                        if (
                                                                            myScope.Model.Selection
                                                                                .SelectedScenarioEffect == null) return;
                                                                        myScope.Model.Selection.SelectedScenarioSpace =
                                                                            null;
                                                                        myScope.Model.Selection.SelectedScenarioPiece =
                                                                            SelectedGameScenarioPiece.Effect;
                                                                    });

            myScope.Model.GetSpaceBySpaceGuid = GetSpaceBySpaceGuidFn;
            myScope.Model.GetAreaByAreaGuid = GetAreaByAreaGuidFn;
            myScope.Model.GetTextByTextGuid = GetTextByTextGuidFn;
            myScope.Model.GetCardByCardGuid = GetCardByCardGuidFn;

            myScope.Model.RemoveSpaceFromEffect = RemoveSpaceFromEffectFn;
            myScope.Model.RemoveAreaFromEffect = RemoveAreaFromEffectFn;
            myScope.Model.RemoveCardFromEffect = RemoveCardFromEffectFn;
            myScope.Model.RemoveTextFromEffect = RemoveTextFromEffectFn;

            myScope.Model.GetEffectByScenarioEffect = GetEffectByScenarioEffectFn;
            myScope.Model.AddCardToSpace = AddCardToSpaceFn;
            myScope.Model.RemoveCardFromSpace = RemoveCardFromSpaceFn;
            myScope.Model.AddNewScenario = AddNewScenarioFn;
            myScope.Model.CloneNewScenario = CloneNewScenarioFn;
            myScope.Model.DeleteScenario = DeleteScenarioFn;
            myScope.Model.GetCurrentlySelected = GetCurrentlySelectedFn;
            myScope.Model.ApplyEffectToCurrentlySelected = ApplyEffectToCurrentlySelectedFn;


            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;
        }

        private void DeleteScenarioFn()
        {
            myScope.Model.Game.GameLayoutScenarios.Remove(myScope.Model.Selection.SelectedScenario);
            myScope.Model.Selection.SelectedScenario =
                myScope.Model.Game.GameLayoutScenarios.Filter(a => a.Name == "Default")[0];
        }

        private void RemoveTextFromEffectFn(string guid)
        {
            myScope.Model.Selection.SelectedScenarioEffect.TextGuids.Remove(guid);
        }

        private void RemoveCardFromEffectFn(string guid)
        {
            myScope.Model.Selection.SelectedScenarioEffect.CardGuids.Remove(guid);
        }

        private void RemoveAreaFromEffectFn(string guid)
        {
            myScope.Model.Selection.SelectedScenarioEffect.AreaGuids.Remove(guid);
        }

        private void RemoveSpaceFromEffectFn(string guid)
        {
            myScope.Model.Selection.SelectedScenarioEffect.SpaceGuids.Remove(guid);
        }

        private GameLayoutScenarioCard GetCardByCardGuidFn(string guid)
        {
            foreach (var scenarioSpace in myScope.Model.Selection.SelectedScenario.Spaces)
            {
                foreach (var gameLayoutScenarioCard in scenarioSpace.Cards)
                {
                    if (gameLayoutScenarioCard.CardGuid == guid)
                        return gameLayoutScenarioCard;
                }
            }
            return null;
        }

        private GameTextModel GetTextByTextGuidFn(string guid)
        {
            foreach (var gameTextModel in myScope.Model.Game.GameLayout.Texts)
            {
                if (gameTextModel.Guid == guid)
                    return gameTextModel;
            }
            return null;
        }

        private GameAreaModel GetAreaByAreaGuidFn(string guid)
        {
            foreach (var gameAreaModel in myScope.Model.Game.GameLayout.Areas)
            {
                if (gameAreaModel.Guid == guid)
                    return gameAreaModel;
            }
            return null;
        }

        private void ApplyEffectToCurrentlySelectedFn()
        {
            GameEditorSelectionScopeModel selection = myScope.Model.Selection;
            if (selection.SelectedArea != null)
            {
                myScope.Model.Selection.SelectedScenarioEffect.AreaGuids.Add(selection.SelectedArea.Guid);
                return;
            }
            if (selection.SelectedText != null)
            {
                myScope.Model.Selection.SelectedScenarioEffect.TextGuids.Add(selection.SelectedText.Guid);
                return;
            }
            if (selection.SelectedCard != null)
            {
                myScope.Model.Selection.SelectedScenarioEffect.CardGuids.Add(selection.SelectedCard.CardGuid);
                return;
            }
            if (selection.SelectedSpace != null)
            {
                myScope.Model.Selection.SelectedScenarioEffect.SpaceGuids.Add(selection.SelectedSpace.Guid);
                return;
            }
        }

        private string GetCurrentlySelectedFn()
        {
            GameEditorSelectionScopeModel selection = myScope.Model.Selection;
            if (selection.SelectedArea != null)
            {
                return "Area: " + selection.SelectedArea.Name;
            }
            if (selection.SelectedText != null)
            {
                return "Text: " + selection.SelectedText.Name;
            }
            if (selection.SelectedCard != null)
            {
                return "Card: " + selection.SelectedCard.Value + " of " + selection.SelectedCard.Type;
            }
            if (selection.SelectedSpace != null)
            {
                return "Space: " + selection.SelectedSpace.Name;
            }
            return "Nothing Selected";
        }

        private GameEffectModel GetEffectByScenarioEffectFn(GameLayoutScenarioEffect effect)
        {
            foreach (var gameEffectModel in myScope.Model.Game.Effects)
            {
                if (gameEffectModel.Guid == effect.EffectGuid)
                    return gameEffectModel;
            }
            return null;
        }

        private void AddNewScenarioFn()
        {
            myScope.Model.Game.GameLayoutScenarios.Add(new GameLayoutScenario()
                                                       {
                                                           Spaces = new List<GameLayoutScenarioSpace>(),
                                                           Effects = new List<GameLayoutScenarioEffect>(),
                                                           Name =
                                                               "Scenario" + myScope.Model.Game.GameLayoutScenarios.Count,
                                                           NumberOfPlayers = 6,
                                                           ScreenSize = new IntPoint(1024, 768)
                                                       });
            GameLayoutEditorController.SureUpScenarios(myScope.Model.Game);
        }

        private void CloneNewScenarioFn()
        {
            myScope.Model.Game.GameLayoutScenarios.Add(new GameLayoutScenario()
                                                       {
                                                           Spaces =
                                                               myScope.Model.Selection.SelectedScenario.Spaces.Map(
                                                                   e => new GameLayoutScenarioSpace()
                                                                        {
                                                                            SpaceGuid = e.SpaceGuid,
                                                                            Cards = e.Cards.Map(
                                                                                c =>
                                                                                {
                                                                                    return new GameLayoutScenarioCard() {CardGuid = Guid.NewGuid().ToString(), State = c.State, Value = c.Value, Type = c.Type};
                                                                                })
                                                                        }),
                                                           Effects =
                                                               myScope.Model.Selection.SelectedScenario.Effects.Map(
                                                                   e => new GameLayoutScenarioEffect()
                                                                        {
                                                                            EffectGuid = e.EffectGuid,
                                                                            AreaGuids = e.AreaGuids,
                                                                            TextGuids = e.TextGuids,
                                                                            CardGuids = e.CardGuids,
                                                                            SpaceGuids = e.SpaceGuids,
                                                                        }),
                                                           Name =
                                                               "Clone Of " +
                                                               myScope.Model.Selection.SelectedScenario.Name,
                                                           NumberOfPlayers =
                                                               myScope.Model.Selection.SelectedScenario.NumberOfPlayers,
                                                           ScreenSize =
                                                               myScope.Model.Selection.SelectedScenario.ScreenSize
                                                       });
        }

        private void RemoveCardFromSpaceFn(GameLayoutScenarioCard arg)
        {
            myScope.Model.Selection.SelectedScenarioSpace.Cards.Remove(arg);
        }

        private void AddCardToSpaceFn()
        {
            myScope.Model.Selection.SelectedScenarioSpace.Cards.Add(new GameLayoutScenarioCard()
                                                                    {
                                                                        CardGuid = Guid.NewGuid().ToString(),
                                                                        State =GameLayoutCardState.FaceUp,
                                                                        Type = 3,
                                                                        Value = 11
                                                                    });
        }

        private GameSpaceModel GetSpaceBySpaceGuidFn(string guid)
        {
            foreach (var gameSpaceModel in myScope.Model.Game.GameLayout.Spaces)
            {
                if (gameSpaceModel.Guid == guid)
                    return gameSpaceModel;
            }
            return null;
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