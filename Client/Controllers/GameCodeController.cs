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
    internal class GameCodeController
    {
        private readonly GameCodeScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly MessageService myMessageService;

        public GameCodeController(GameCodeScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService, MessageService messageService)
        {
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            scope.Visible = true;
        } 
    }
}