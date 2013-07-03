using System.Runtime.CompilerServices;
using Client.Scope.Controller;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{
    public class TestTextScope : TestGameControllerScope
    {

        [IntrinsicProperty]
        public GameTextModel Text { get; set; }
        [IntrinsicProperty]
        public dynamic TextStyle { get; set; }

    }
}