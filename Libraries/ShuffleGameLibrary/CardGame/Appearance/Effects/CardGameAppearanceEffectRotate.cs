using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("Effect$Rotate")]
    public class CardGameAppearanceEffectRotate : CardGameAppearanceEffect
    {
        [IntrinsicProperty]
        public double Degrees { get; set; }

        public CardGameAppearanceEffectRotate(CardGameEffectRotateOptions options) : base(EffectType.Rotate)
        {
            Degrees = options.Degrees == 0 ? 0 : options.Degrees;
            DrawTime = CardGameAppearanceEffectDrawTime.During;
        }
    }
}