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
        public Func<string, GameSpaceModel> GetSpaceBySpaceGuid { get; set; }
        public Func<string, GameAreaModel> GetAreaByAreaGuid { get; set; }
        public Func<string, GameTextModel> GetTextByTextGuid { get; set; }
        public Func<string, GameLayoutScenarioCard> GetCardByCardGuid { get; set; }

        public Func<GameLayoutScenarioEffect, GameEffectModel> GetEffectByScenarioEffect { get; set; }
        public Action AddCardToSpace { get; set; }
        public Action<GameLayoutScenarioCard> RemoveCardFromSpace { get; set; }
        public Action AddNewScenario { get; set; }
        public Action DeleteScenario { get; set; }
        
        public Action CloneNewScenario { get; set; }
        public Func<string> GetCurrentlySelected { get; set; }
        public Action ApplyEffectToCurrentlySelected { get; set; }
        public Action<string> RemoveSpaceFromEffect { get; set; }
        public Action<string> RemoveAreaFromEffect { get; set; }
        public Action<string> RemoveCardFromEffect { get; set; }
        public Action<string> RemoveTextFromEffect { get; set; }
    }
}