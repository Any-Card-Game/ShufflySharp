using System;
using System.Collections.Generic;
using System.Html;
using Client.Scope;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using Models;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game; 
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
            myScope.Model.OpenCode = OpenCodeFn;
            myScope.Model.OpenEffects = OpenEffectsFn;
            myScope.Model.OpenLayout = OpenLayoutFn;
            myScope.Model.OpenTest = OpenTestFn;
            myScope.Model.Selection = new GameEditorSelectionScopeModel() { ShowGrid = true ,SelectedScenarioPieces = new SelectedScenarioPieces()
                                                                                                                      {
                                                                                                                          Piece = SelectedScenarioPieceType.None
                                                                                                                      
                                                                                                                      }};

            myScope.Visible = false;
            uiManager.OpenGameEditor += (game) =>
            {
                myScope.Visible = true;

                myScope.SwingAway(SwingDirection.TopRight, true, null);
                myScope.SwingBack(null);
                myScope.Model.Game = game;
            };
            myScope.OnClose += () =>
                               {
                                   //todo destroy spawned
                               };
            myScope.watch("model.game",
                          () => {
                              myScope.Model.UpdateStatus = UpdateStatusType.Dirty;
                          },
                          true);
            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;


        }

        private void OpenTestFn()
        {
        }

        private void OpenLayoutFn()
        {
            myCreateUIService.CreateSingleton<GameLayoutEditorScope>("GameLayoutEditor", (scope, elem) =>
            {
                scope.Model = new GameLayoutEditorScopeModel();
                scope.Model.Game = myScope.Model.Game;
                scope.Model.Selection = myScope.Model.Selection;
            });
        }

        private void OpenEffectsFn()
        {

            myCreateUIService.CreateSingleton<GameEffectsEditorScope>("GameEffectsEditor", (scope, elem) =>
                                                                                           {
                                                                                               scope.Model =new GameEffectsEditorScopeModel();
                                                                                               scope.Model.Game = myScope.Model.Game;
                                                                                               scope.Model.Selection = myScope.Model.Selection;

                                                                                           });

        }

        private void OpenCodeFn()
        {
            myCreateUIService.CreateSingleton<GameCodeScope>("GameCodeEditor", (scope, elem) =>
                                                                        {
                                                                            scope.Model=new GameCodeScopeModel();
                                                                            scope.Model.Code = myScope.Model.Game.GameCode;

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