using System;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Models;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Controllers
{
    internal class MessageController
    {
        private readonly MessageScope myScope;
        private readonly UIManagerService myUIManager;

        public MessageController(MessageScope scope)
        {
            myScope = scope;
        }
    }
}