using System.Runtime.CompilerServices;
using Client.Scope.Controller;
using global;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{
    public class TestSpaceScope : TestGameControllerScope
    {

        [IntrinsicProperty]
        public GameSpaceModel Space { get; set; }
        [IntrinsicProperty]
        public dynamic SpaceStyle { get; set; }

    }
    public class EffectTestSpaceScope : EffectTesterControllerScope
    {

        [IntrinsicProperty]
        public GameSpaceModel Space { get; set; }
        [IntrinsicProperty]
        public dynamic SpaceStyle { get; set; }

    }
    public class EffectTestAreaScope : EffectTesterControllerScope
    {

        [IntrinsicProperty]
        public GameAreaModel Area { get; set; }
        [IntrinsicProperty]
        public dynamic AreaStyle { get; set; }

    }
    public class EffectTestTextScope : EffectTesterControllerScope
    {

        [IntrinsicProperty]
        public GameTextModel Text { get; set; }
        [IntrinsicProperty]
        public dynamic TextStyle { get; set; }

    }
}