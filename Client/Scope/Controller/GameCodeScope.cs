using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.GameManagerModels;
using Models.SiteManagerModels.Game;
using WebLibraries.CodeMirror;

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
        public object CodeMirrorOptions { get; set; }
    }


    public class DebugGameCodeScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public DebugGameCodeScopeModel Model { get; set; }
    }

    [Serializable]
    public class DebugGameCodeScopeModel : GameUpdater
    {
        public GameModel Game { get; set; }
        public GameRoomModel Room { get; set; }
        public bool ForceUpdate { get; set; }
        public GameEditorSelectionScopeModel Selection { get; set; }
        public CodeMirrorOptions CodeMirrorOptions { get; set; }
        public List<int> Breakpoints { get; set; }
        public Action Step { get; set; }
        public Action Continue { get; set; }
        public CodeMirror CodeMirror     { get; set; }
    }

}