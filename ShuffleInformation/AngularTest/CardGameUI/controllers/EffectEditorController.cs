using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
namespace CardGameUI.Controllers
{
    internal class EffectEditorController
    {
        private readonly EffectEditorScope myScope;
        private readonly EditEffectService myEditEffects;

        public EffectEditorController(EffectEditorScope scope, EditEffectService editEffects)
        {
            myScope = scope;
            myEditEffects = editEffects;
            editEffects.PopOpenEffect +=PopOpenEffectFn;

        }

         private void PopOpenEffectFn(Effect effect)
         {

             myScope.Effect = effect;
         }
    }
/*
    public class EffectLibrary
    {
        JsDictionary<string,> 
     }*/
}