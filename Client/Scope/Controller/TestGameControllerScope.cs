using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using global;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{
    public class TestGameControllerScope : BaseScope
    {
        [IntrinsicProperty]
        public TestGameControllerScopeModel Model { get; set; }

    }
    [Serializable]
    public class TestGameControllerScopeModel
    {
        public GameModel Game { get; set; }
        public Point Scale { get; set; }
        public Action MoveCard { get; set; }
        public Action AnimateCard { get; set; }
        public GameEditorSelectionScopeModel Selection { get; set; }
        public Func<GameSpaceModel, List<GameLayoutScenarioCard>> GetCardsFromScenario { get; set; }
    }

 

}