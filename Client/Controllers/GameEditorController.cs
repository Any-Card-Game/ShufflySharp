using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using Models;
using Models.DebugGameManagerModels;
using Models.SiteManagerModels;

namespace Client.Controllers
{
    internal class GameEditorController
    {
        public const string Name = "GameEditorController";
        public const string View = "GameEditor";
        private readonly ClientDebugManagerService clientDebugManagerService;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly CreateUIService myCreateUIService;
        private readonly MessageService myMessageService;
        private readonly GameEditorScope myScope;

        public GameEditorController(GameEditorScope scope,
            ClientSiteManagerService clientSiteManagerService, ClientDebugManagerService clientDebugManagerService,
            MessageService messageService, CreateUIService createUIService)
        {
            myScope = scope;
            myClientSiteManagerService = clientSiteManagerService;
            this.clientDebugManagerService = clientDebugManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Model.OpenCode = OpenCodeFn;
            myScope.Model.OpenEffects = OpenEffectsFn;
            myScope.Model.OpenLayout = OpenLayoutFn;
            myScope.Model.OpenTest = OpenTestFn;
            myScope.Model.Selection = new GameEditorSelectionScopeModel()
                                      {
                                          ShowGrid = true,
                                          ShowCards = true,
                                          SelectedScenarioPieces = new SelectedScenarioPieces()
                                                                   {
                                                                       Piece = SelectedScenarioPieceType.None
                                                                   }
                                      };

            myScope.Visible = false;
            myScope.OnClose += () =>
                               {
                                   //todo destroy spawned
                               };
            myScope.watch("model.game",
                () => { myScope.Model.UpdateStatus = UpdateStatusType.Dirty; },
                true);
            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;
            myScope.OnReady += () =>
                               {
                                   myScope.Visible = true;
                                   myScope.SwingAway(SwingDirection.TopRight, true, null);
                                   myScope.SwingBack(null);
                               };
        }

        private void OpenTestFn()
        {
            myCreateUIService.CreateSingleton<GameTestEditorScope>(GameTestEditorController.View, (scope, elem) =>
            {
                scope.Model = new GameTestEditorScopeModel();
                scope.Model.Game = myScope.Model.Game;
                scope.Model.Selection = myScope.Model.Selection;
            });


        }

        private void OpenLayoutFn()
        {
            myCreateUIService.CreateSingleton<GameLayoutEditorScope>(GameLayoutEditorController.View, (scope, elem) =>
                                                                                                      {
                                                                                                          scope.Model = new GameLayoutEditorScopeModel();
                                                                                                          scope.Model.Game = myScope.Model.Game;
                                                                                                          scope.Model.Selection = myScope.Model.Selection;
                                                                                                      });
        }

        private void OpenEffectsFn()
        {
            myCreateUIService.CreateSingleton<GameEffectsEditorScope>(GameEffectsEditorController.View, (scope, elem) =>
                                                                                                        {
                                                                                                            scope.Model = new GameEffectsEditorScopeModel();
                                                                                                            scope.Model.Game =
                                                                                                                myScope.Model.Game;
                                                                                                            scope.Model.Selection = myScope.Model.Selection;
                                                                                                        });
        }

        private void OpenCodeFn()
        {
            myCreateUIService.CreateSingleton<GameCodeScope>(GameCodeController.View, (scope, elem) =>
                                                                                      {
                                                                                          scope.Model = new GameCodeScopeModel();
                                                                                          scope.Model.Game = myScope.Model.Game;
                                                                                          scope.Model.Selection = myScope.Model.Selection;
                                                                                      });
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