using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
namespace CardGameUI.Scope
{
    public class ListEffectsScope : BaseScope
    {
        [IntrinsicProperty]
        public string NewEffect { get; set; }
        [IntrinsicProperty]
        public Action AddEffect { get; set; }
        [IntrinsicProperty]
        public List<Effect> Effects { get; set; }
        [IntrinsicProperty]
        public List<EffectType2> EffectTypes { get; set; }
        [IntrinsicProperty]
        public EffectType2 SelectedEffectType { get; set; }
        [IntrinsicProperty]
        public Action<Effect> EffectClick { get; set; }
        [IntrinsicProperty]
        public Action<Effect> EnableEffect { get; set; }
    }
}