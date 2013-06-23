using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;
namespace Client.Scope.Controller
{
    public class EffectEditorScope : BaseScope
    {
        [IntrinsicProperty]
        public GameEffectModel Effect { get; set; }
    }
}