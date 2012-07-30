using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Effect$Bend")]
    public class CardGameEffectBend: CardGameEffect
    {
        public CardGameEffectBend(CardGameEffectRotateOptions options)
        {
            Type = "bend";
            Degrees = options.Degrees == 0 ? 0 : options.Degrees;
            DrawTime = DrawTime.During;
        }



        [ScriptName("degrees")]
        [IntrinsicProperty]
        public double Degrees { get; set; }

    }
}