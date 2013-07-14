using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{
    public class GameCodeScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameCodeScopeModel Model { get; set; }
    }

    [Serializable]
    public class GameCodeScopeModel : GameUpdater
    {
        public GameModel Game { get; set; }
        public bool ForceUpdate { get; set; }
        public GameEditorSelectionScopeModel Selection { get; set; }
    }
}