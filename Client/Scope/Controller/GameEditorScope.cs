using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.SiteManagerModels.Game;
namespace Client.Scope.Controller
{


    public class GameEditorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameEditorModel Model { get; set; }
    }
    [NamedValues]
    public enum UpdateStatusType
    {
        Dirty,
        Syncing,
        Synced
    }
    [Serializable]
    public class GameEditorModel : GameUpdater
    {
        public GameModel Game { get; set; }
        public Action OpenCode { get; set; }
        public Action OpenLayout { get; set; }
        public Action OpenEffects { get; set; }
        public Action OpenTest { get; set; }
        public GameEditorSelectionScopeModel Selection { get; set; }
    }

    [Serializable]
    public class GameUpdater
    {

        public Action UpdateGame { get; set; }
        public UpdateStatusType UpdateStatus { get; set; }
    }
}