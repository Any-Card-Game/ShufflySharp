using System;
using System.Runtime.CompilerServices;
using global;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{
    public class TestCardScope : TestSpaceScope
    {
        [IntrinsicProperty]
        public GameLayoutScenarioCard Card { get; set; }
        [IntrinsicProperty]
        public dynamic CardStyle { get; set; }
        [IntrinsicProperty]
        public Action CardClick { get; set; }
    }
    public class EffectTestCardScope : EffectTestSpaceScope
    {
        [IntrinsicProperty]
        public GameLayoutScenarioCard Card { get; set; }
        [IntrinsicProperty]
        public dynamic CardStyle { get; set; }
        [IntrinsicProperty]
        public EffectTestType Test { get; set; }
    }
    [NamedValues]
    public enum EffectTestType
    {
        Card,Space,Area,Text
    }
}