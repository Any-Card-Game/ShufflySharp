using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{
    public class GameLayoutEditorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameLayoutEditorScopeModel Model { get; set; }
    } 

    [Serializable]
    public class GameLayoutEditorScopeModel : GameUpdater
    {
        public GameSpaceModel SelectedSpace { get; set; }
        public GameTextModel SelectedText { get; set; }
        public GameAreaModel SelectedArea { get; set; }
        public SelectedGameLayoutPiece SelectedPiece { get; set; }
        public GameModel Game { get; set; }
        public Action AddText { get; set; }
        public Action AddArea { get; set; }
        public Action AddSpace { get; set; }
        public Action Test { get; set; }
    }

    [NamedValues]
    public enum SelectedGameLayoutPiece
    {
        None,Space,Text,Area
    }
}