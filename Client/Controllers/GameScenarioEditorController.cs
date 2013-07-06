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
        private readonly GameScenarioEditorScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly MessageService myMessageService;
        private readonly CreateUIService myCreateUIService;

        public GameScenarioEditorController(GameScenarioEditorScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService, MessageService messageService, CreateUIService createUIService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Visible = true;

            myScope.watch("model.game",
                () =>
                {
                    myScope.Model.UpdateStatus = UpdateStatusType.Dirty;
                },
                true);

            myScope.watch("model.selection.selectedScenario", () =>
            {
                if (myScope.Model.Selection.SelectedScenario == null) return;
                myScope.Model.Selection.SelectedScenarioEffect = null;
                myScope.Model.Selection.SelectedScenarioSpace = null;

            });

            myScope.watch("model.selection.selectedScenarioSpace", () =>
            {
                if (myScope.Model.Selection.SelectedScenarioSpace == null) return;
                myScope.Model.Selection.SelectedScenarioEffect = null;
                myScope.Model.Selection.SelectedScenarioPiece = SelectedGameScenarioPiece.Space;


            });
            myScope.watch("model.selection.selectedScenarioEffect", () =>
            {
                if (myScope.Model.Selection.SelectedScenarioEffect == null) return;
                myScope.Model.Selection.SelectedScenarioSpace = null;
                myScope.Model.Selection.SelectedScenarioPiece = SelectedGameScenarioPiece.Effect;

            });

            myScope.Model.GetSpaceByScenarioSpace = GetSpaceByScenarioSpaceFn;
            myScope.Model.AddCard = AddCardFn;
            myScope.Model.RemoveCard = RemoveCardFn;
            myScope.Model.AddNewScenario = AddNewScenarioFn;
            myScope.Model.CloneNewScenario = CloneNewScenarioFn;



            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;
        }

        private void AddNewScenarioFn()
        {
            myScope.Model.Game.GameLayoutScenarios.Add(new GameLayoutScenario()
            {
                Spaces = new List<GameLayoutScenarioSpace>(),
                Effects = new List<GameLayoutScenarioEffect>(),
                Name = "Scenario" + myScope.Model.Game.GameLayoutScenarios.Count,
                NumberOfPlayers = 6,
                ScreenSize = new IntPoint(1024, 768)
            });
        }
        private void CloneNewScenarioFn()
        {
            myScope.Model.Game.GameLayoutScenarios.Add(new GameLayoutScenario()
            {
                Spaces = myScope.Model.Selection.SelectedScenario.Spaces.Map(e => new GameLayoutScenarioSpace()
                {
                    SpaceGuid = e.SpaceGuid,
                    Cards = e.Cards.Map(
                        c =>
                        {
                            return new GameLayoutScenarioCard() { State = c.State, Value = c.Value, Type = c.Type };
                        })
                }),
                Effects = myScope.Model.Selection.SelectedScenario.Effects.Map(e => new GameLayoutScenarioEffect() { }),
                Name = "Clone Of " + myScope.Model.Selection.SelectedScenario.Name,
                NumberOfPlayers = myScope.Model.Selection.SelectedScenario.NumberOfPlayers,
                ScreenSize = myScope.Model.Selection.SelectedScenario.ScreenSize
            });

        }

        private void RemoveCardFn(GameLayoutScenarioCard arg)
        {
            myScope.Model.Selection.SelectedScenarioSpace.Cards.Remove(arg);
        }

        private void AddCardFn()
        {
            myScope.Model.Selection.SelectedScenarioSpace.Cards.Add(new GameLayoutScenarioCard() { State = GameLayoutCardState.FaceUp, Type = 3, Value = 11 });
        }

        private GameSpaceModel GetSpaceByScenarioSpaceFn(GameLayoutScenarioSpace space)
        {
            foreach (var gameSpaceModel in myScope.Model.Game.GameLayout.Spaces)
            {
                if (gameSpaceModel.Guid == space.SpaceGuid)
                    return gameSpaceModel;
            }
            return null;
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