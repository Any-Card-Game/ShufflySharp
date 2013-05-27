using System.Collections.Generic;
using Client.Angular.interfaces;
using ng;
namespace Client.Angular.controllers
{
    internal class EffectEditorController
    {
        private readonly EffectEditorScope myScope;

        public EffectEditorController(EffectEditorScope scope)
        {
            myScope = scope;
            scope.Effects = new List<string>();

            scope.Effects.Add("Highlight");
            scope.NewEffect = "hi";
            scope.AddEffect = AddEffectFn;
        }

        private void AddEffectFn()
        {
        
            myScope.Effects.Add(myScope.NewEffect);
            myScope.NewEffect = "Hi!";
        }
    }
}