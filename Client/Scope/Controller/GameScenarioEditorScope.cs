using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{
    public class GameScenarioEditorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameScenarioEditorScopeModel Model { get; set; }
    }
    [Serializable]
    public class GameScenarioEditorScopeModel : GameUpdater
    {
        public GameEditorSelectionScopeModel Selection { get; set; }
        public GameModel Game { get; set; }
        public Func<GameLayoutScenarioSpace, GameSpaceModel> GetSpaceByScenarioSpace { get; set; }
        public Action AddCard { get; set; }
        public Action<GameLayoutScenarioCard> RemoveCard { get; set; }
        public Action AddNewScenario { get; set; }
        public Action CloneNewScenario { get; set; }
    }
}