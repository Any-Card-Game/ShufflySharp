using System.Runtime.CompilerServices;
using Client.Scope.Controller;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{
    public class EffectTestSpaceScope : EffectTesterControllerScope
    {
        [IntrinsicProperty]
        public GameSpaceModel Space { get; set; }

        [IntrinsicProperty]
        public dynamic SpaceStyle { get; set; }
    }
}