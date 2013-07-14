using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{
    public class GameEffectsEditorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameEffectsEditorScopeModel Model { get; set; }
    }

    [Serializable]
    public class GameEffectsEditorScopeModel : GameUpdater
    {
        public GameModel Game { get; set; }
        public GameEditorSelectionScopeModel Selection { get; set; }

        public string NewEffectName { get; set; }
        public EffectType NewEffectType { get; set; }

        public List<EffectType> EffectTypes { get; set; }

        public Action AddEffect { get; set; }
        public Action<GameEffectModel> RemoveEffect { get; set; }
    }
}