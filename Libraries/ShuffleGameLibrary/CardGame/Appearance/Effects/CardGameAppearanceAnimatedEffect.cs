using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("AnimatedEffect")]
    public class CardGameAppearanceAnimatedEffect : CardGameAppearanceEffect
    {
        [ScriptName("type")]
        [IntrinsicProperty]
        public CardGameAppearanceAnimatedEffectType AnimationType { get; set; }
        [IntrinsicProperty]
        public int Duration { get; set; }
        [IntrinsicProperty]
        public int PauseAfter { get; set; }
        [IntrinsicProperty]
        public int PauseBefore { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceAnimatedEffectEase Ease { get; set; }

        public CardGameAppearanceAnimatedEffect(CardGameAppearanceAnimatedEffectType animationEffectType, int duration, CardGameAppearanceAnimatedEffectEase ease)
                : base(EffectType.Animated)
        {
            Ease = ease;
            AnimationType = animationEffectType;
            Duration = duration;
        }
    }
}