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
        public GameEditorSelectionScopeModel Selection { get; set; }
        public GameModel Game { get; set; }
        public Action AddText { get; set; }
        public Action AddArea { get; set; }
        public Action AddSpace { get; set; }
        public Action<GameSpaceModel> RemoveSpace { get; set; }
        public Action<GameAreaModel> RemoveArea { get; set; }
        public Action<GameTextModel> RemoveText { get; set; }
        public Action OpenScenarios { get; set; }
        public Action ToggleGrid { get; set; }
    }
    [Serializable]
    public class GameEditorSelectionScopeModel : GameUpdater
    {
        public GameEffectModel SelectedEffect { get; set; }
        public GameLayoutScenarioCard SelectedScenarioCard { get; set; }
        public GameLayoutScenarioSpace SelectedScenarioSpace { get; set; }
        public GameLayoutScenarioEffect SelectedScenarioEffect { get; set; }
        public GameSpaceModel SelectedSpace { get; set; }
        public GameTextModel SelectedText { get; set; }
        public GameAreaModel SelectedArea { get; set; }
        public GameLayoutScenarioCard SelectedCard { get; set; }
        public SelectedGameLayoutPiece SelectedLayoutPiece { get; set; }
        public SelectedGameScenarioPiece SelectedScenarioPiece { get; set; }
        public GameLayoutScenario SelectedScenario { get; set; }
        public bool ShowGrid { get; set; }
    }

    [NamedValues]
    public enum SelectedGameLayoutPiece
    {
        None, Space, Text, Area
    }
    [NamedValues]
    public enum SelectedGameScenarioPiece
    {
        None, Space,Effect
    }
}