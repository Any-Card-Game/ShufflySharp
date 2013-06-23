using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;
namespace Client.Scope.Controller
{
    public class ListEffectsScope : BaseScope
    {
        [IntrinsicProperty]
        public string NewEffect { get; set; }
        [IntrinsicProperty]
        public Action AddEffect { get; set; }
        [IntrinsicProperty]
        public List<GameEffectModel> Effects { get; set; }
        [IntrinsicProperty]
        public List<EffectType> EffectTypes { get; set; }
        [IntrinsicProperty]
        public EffectType SelectedEffectType { get; set; }
        [IntrinsicProperty]
        public Action<GameEffectModel> EffectClick { get; set; }
        [IntrinsicProperty]
        public Action<GameEffectModel> EnableEffect { get; set; }
    }
}