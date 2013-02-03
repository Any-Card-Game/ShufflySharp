using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("AnimatedEffect$Between")]
    public class CardGameAppearanceAnimatedEffectBetweenProperties : CardGameAppearanceAnimatedEffect
    {
        [IntrinsicProperty]
        public CardGameAppearanceEffectStyleProperty From { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceEffectStyleProperty To { get; set; }

        public CardGameAppearanceAnimatedEffectBetweenProperties(int duration, CardGameAppearanceAnimatedEffectEase ease)
                : base(CardGameAppearanceAnimatedEffectType.Between, duration, ease)
        {
            From = new CardGameAppearanceEffectStyleProperty(new CardGameAppearanceStyle());
            To = new CardGameAppearanceEffectStyleProperty(new CardGameAppearanceStyle());
        }
    }
}