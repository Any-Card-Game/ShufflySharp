using System;
using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("Effect$Bend")]
    public class CardGameAppearanceEffectBend : CardGameAppearanceEffect
    {
        [IntrinsicProperty]
        public double Degrees { get; set; }

        public CardGameAppearanceEffectBend(CardGameEffectBendOptions options) : base(EffectType.Bend)
        {
            Degrees = options.Degrees == 0 ? 0 : options.Degrees;
            DrawTime = CardGameAppearanceEffectDrawTime.During;
        }
    }
    [Serializable]
    public class CardGameEffectBendOptions
    {
        public double Degrees { get; set; }
    }
}