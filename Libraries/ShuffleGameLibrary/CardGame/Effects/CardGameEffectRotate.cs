using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Effect$Rotate")]
    public class CardGameEffectRotate : CardGameEffect
    {
        public CardGameEffectRotate(CardGameEffectRotateOptions options)
        {
            Type = "rotate";
            Degrees = options.Degrees == 0 ? 0 : options.Degrees;
            DrawTime = DrawTime.During;
        }



        [ScriptName("degrees")]
        [IntrinsicProperty]
        public double Degrees { get; set; }

    }
}