using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Models.SiteManagerModels.Game;
namespace Client.Controllers
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

        private void PopOpenEffectFn(GameEffectModel effect)
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