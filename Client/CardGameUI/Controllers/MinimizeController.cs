using System.Collections.Generic;
using System.Html;
using CardGameUI.Directives;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
using Client;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace CardGameUI.Controllers
{
    internal class MinimizeController
    {
        private readonly MinimizeScope myScope;
        private UIManagerService myUIManager;

        public MinimizeController(MinimizeScope scope, UIManagerService uiManager)
        {
            myScope = scope;
            myUIManager = uiManager;
            scope.Items = new List<FloatingWindowScope>();

            uiManager.OnMinimize = floatingWindowBaseScope => scope.Items.Add(floatingWindowBaseScope);

            scope.Open = OpenFn;
            scope.Remove = RemoveFn;
        }

        private void RemoveFn(FloatingWindowScope arg)
        {
            arg.Close();
            myScope.Items.Remove(arg);
        }

        private void OpenFn(FloatingWindowScope arg)
        {
            arg.Restore();
            myScope.Items.Remove(arg);
        }
    }
}