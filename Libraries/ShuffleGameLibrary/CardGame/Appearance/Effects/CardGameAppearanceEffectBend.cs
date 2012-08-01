using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Effect$Bend")]
    public class CardGameAppearanceEffectBend: CardGameAppearanceEffect
    {
        public CardGameAppearanceEffectBend(CardGameEffectRotateOptions options):base(EffectType.Bend)
        {
            Degrees = options.Degrees == 0 ? 0 : options.Degrees;
            DrawTime = CardGameAppearanceEffectDrawTime.During;
        }



        [ScriptName("degrees")]
        [IntrinsicProperty]
        public double Degrees { get; set; }

    }
    [Record]
    public sealed class CardGameEffectBendOptions
    {
        [ScriptName("degrees")]
        [IntrinsicProperty]
        public double Degrees { get; set; }
    }
}