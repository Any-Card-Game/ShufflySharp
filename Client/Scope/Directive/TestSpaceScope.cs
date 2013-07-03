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
}