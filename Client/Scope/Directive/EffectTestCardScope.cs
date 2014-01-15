using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{
    public class EffectTestCardScope : EffectTestSpaceScope
    {
        [IntrinsicProperty]
        public GameLayoutScenarioCard Card { get; set; }

        [IntrinsicProperty]
        public dynamic CardStyle { get; set; }

        [IntrinsicProperty]
        public EffectTestType Test { get; set; }
    }
}