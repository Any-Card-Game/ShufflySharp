using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{
    public class EffectTesterControllerScope : BaseScope
    {
        [IntrinsicProperty]
        public EffectTesterControllerScopeModel Model { get; set; }

    }
    [Serializable]
    public class EffectTesterControllerScopeModel
    {
        public GameModel Game { get; set; }
        public GameEditorSelectionScopeModel Selection { get; set; }
         

        public Point Scale { get; set; }
        public EffectTesterSpaceModel SpaceTest { get; set; }
        public EffectTesterAreaModel AreaTest { get; set; }
        public EffectTesterTextModel TextTest { get; set; }
        public EffectTesterCardModel CardTest { get; set; }
    }
    [Serializable]
    public class EffectTesterSpaceModel
    {
        public GameSpaceModel Space { get; set; }
        public List<GameLayoutScenarioCard> Cards { get; set; }
    }
    
    [Serializable]
    public class EffectTesterTextModel
    {
        public GameTextModel Text { get; set; }
    }
    [Serializable]
    public class EffectTesterAreaModel
    {
        public GameAreaModel Area { get; set; }
    }
    [Serializable]
    public class EffectTesterCardModel
    {
        public GameSpaceModel Space { get; set; }
        public GameLayoutScenarioCard Card { get; set; }
    }
}