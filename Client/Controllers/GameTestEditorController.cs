using System.Collections.Generic;
using System.Html;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using CommonLibraries;
using Models;
using Models.DebugGameManagerModels;
using Models.GameManagerModels;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;

namespace Client.Controllers
{
    internal class GameTestEditorController
    {
        public const string Name = "GameTestEditorController";
        public const string View = "GameTestEditor";
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly ClientDebugManagerService clientDebugManagerService;
        private readonly CreateUIService myCreateUIService;
        private readonly MessageService myMessageService;
        private readonly GameTestEditorScope scope;

        public GameTestEditorController(GameTestEditorScope scope, ClientSiteManagerService clientSiteManagerService, ClientDebugManagerService clientDebugManagerService, MessageService messageService, CreateUIService createUIService)
        {
            this.scope = scope;
            myClientSiteManagerService = clientSiteManagerService;
            this.clientDebugManagerService = clientDebugManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            this.scope.Visible = false;
            scope.Model.Log = new List<string>();

            this.scope.OnReady += () =>
            {
                this.scope.SwingAway(SwingDirection.Right, true, null);
                this.scope.SwingBack(null);
            };

            this.scope.Model.StartGame = StartGameFn;
            this.scope.Model.DestroyGame = DestroyGameFn;

            this.scope.Model.GameRunning = false;



            this.scope.Watch("model.game",
                () => { this.scope.Model.UpdateStatus = UpdateStatusType.Dirty; },
                true);
            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            this.scope.Model.UpdateStatus = UpdateStatusType.Synced;
            this.scope.Model.UpdateGame = UpdateGameFn;


            clientDebugManagerService.OnGetDebugLog += clientDebugManagerService_OnGetDebugLog;
            clientDebugManagerService.OnGameStarted += (user, roomModel) =>
            {
                this.scope.Model.GameRunning = true;
                this.scope.Model.Room = roomModel;
                if (this.scope.Model.CodeEditor!=null)
                this.scope.Model.CodeEditor.Scope.Model.Room = roomModel; 
            };

            this.scope.Model.DebugCode = () =>
                                         {
                                             this.scope.Model.CodeEditor = myCreateUIService.CreateSingleton<DebugGameCodeScope>(DebugGameCodeController.View, (innerScope, elem) =>
                                                                                                                                        {
                                                                                                                                            innerScope.Model = new DebugGameCodeScopeModel();
                                                                                                                                            innerScope.Model.Game = this.scope.Model.Game;
                                                                                                                                            innerScope.Model.Selection = this.scope.Model.Selection;
                                                                                                                                        });
                                         };


/*
            Window.SetTimeout(() =>
                              {
                                  StartGameFn();
                                  scope.Minimize();
                              }, 250);
*/


        }

        private void DestroyGameFn()
        {
            clientDebugManagerService.DestroyGame(new DestroyDebugGameRequest(scope.Model.Room.RoomID));
            scope.Model.GameRunning = false;
            if (this.scope.Model.CodeEditor != null)
                scope.Model.CodeEditor.Scope.Model.Room = null;

            scope.Model.GameView.Destroy();
        }

        private void StartGameFn()
        {

            scope.Model.GameRunning = true;
            scope.Model.GameView = myCreateUIService.CreateSingleton(DebugGameController.View);
            clientDebugManagerService.CreateGame(new CreateDebugGameRequest(6, scope.Model.Game.Name, this.scope.Model.CodeEditor==null ?new List<int>(): this.scope.Model.CodeEditor.Scope.Model.Breakpoints));
        }

        void clientDebugManagerService_OnGetDebugLog(UserModel user, DebugGameLogModel o)
        {
            scope.Model.Log.Add(o.Value);
            scope.Apply();

        }

        private void OnDeveloperUpdateGameReceivedFn(UserModel user, DeveloperUpdateGameResponse o)
        {
            scope.Model.UpdateStatus = UpdateStatusType.Synced;
            scope.Apply();
        }

        private void UpdateGameFn()
        {
            scope.Model.UpdateStatus = UpdateStatusType.Syncing;

            myClientSiteManagerService.DeveloperUpdateGame(scope.Model.Game);
        }
    }
}