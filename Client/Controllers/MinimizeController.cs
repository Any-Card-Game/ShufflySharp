using System.Collections.Generic;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;

namespace Client.Controllers
{
    internal class MinimizeController
    {
        public const string Name = "MinimizeController";
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