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
        private readonly GameTestEditorScope myScope;

        public GameTestEditorController(GameTestEditorScope scope, ClientSiteManagerService clientSiteManagerService, ClientDebugManagerService clientDebugManagerService, MessageService messageService, CreateUIService createUIService)
        {
            myScope = scope;
            myClientSiteManagerService = clientSiteManagerService;
            this.clientDebugManagerService = clientDebugManagerService;
            myMessageService = messageService;
            myCreateUIService = createUIService;
            myScope.Visible = false;

            myScope.OnReady+=()=>
            {
                myScope.Visible = true;
                myScope.SwingAway(SwingDirection.Right, true, null);
                myScope.SwingBack(null);
            };

            myScope.Model.StartGame = StartGameFn;
            myScope.Model.DestroyGame = DestroyGameFn;
            
                myScope.Model.GameRunning = false;



            myScope.watch("model.game",
                () => { myScope.Model.UpdateStatus = UpdateStatusType.Dirty; },
                true);
            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;


            clientDebugManagerService.OnGetDebugLog += clientDebugManagerService_OnGetDebugLog;
            clientDebugManagerService.OnGameStarted += (user, roomModel) =>
            {
                myScope.Model.GameRunning = true;
                myScope.Model.Room = roomModel;
            };



        }

        private void DestroyGameFn()
        {
            clientDebugManagerService.DestroyGame(new DestroyDebugGameRequest(myScope.Model.Room.RoomID));
            myScope.Model.GameRunning = false;
            myScope.Model.GameView.Destroy();
        }

        private void StartGameFn()
        { 

                                  myScope.Model.GameRunning = true;
                                  myScope.Model.GameView = myCreateUIService.CreateSingleton(DebugGameController.View);
                                  clientDebugManagerService.CreateGame(new CreateDebugGameRequest(6, myScope.Model.Game.Name));

        }

        void clientDebugManagerService_OnGetDebugLog(UserModel user, DebugGameLogModel o)
        {
            myScope.Model.Log+=(o.Value)+"\r\n";
            myScope.Apply();

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