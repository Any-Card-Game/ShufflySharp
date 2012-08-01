using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Effect")]
    public class CardGameAppearanceEffect
    {
        public CardGameAppearanceEffect(EffectType type)
        {
            Type = type;
            DrawTime = CardGameAppearanceEffectDrawTime.Pre; 
        }

        [ScriptName("type")]
        [IntrinsicProperty]
        public EffectType Type { get; set; }

        [ScriptName("post")]
        [IntrinsicProperty]
        public CardGameAppearanceEffectDrawTime DrawTime { get; set; }

        [ScriptName("childrenEffects")]
        [IntrinsicProperty]
        public CardGameAppearanceEffect ChainedEffect { get; set; }

        [ScriptName("chainEffect")]
        public CardGameAppearanceEffect ChainEffect(CardGameAppearanceEffect ef)
        {
            ChainedEffect=(ef);
            return ef;
        } 
        
    }
    [NamedValues]
    public enum CardGameAppearanceEffectDrawTime
    {
        Pre,During,Post
    }
    [ScriptName("Effect$StyleProperty")]
    public class CardGameAppearanceEffectStyleProperty : CardGameAppearanceEffect
    {
        public CardGameAppearanceEffectStyleProperty()
            : base(EffectType.StyleProperty)
        {
        }

        [ScriptName("style")]
        [IntrinsicProperty]
        public CardGameAppearanceStyle Style { get; set; }
    }

    [ScriptName("AnimatedEffect")]
    public class CardGameAppearanceAnimatedEffect : CardGameAppearanceEffect
    {
        public CardGameAppearanceAnimatedEffect(CardGameAppearanceAnimatedEffectType animationEffectType)
            : base(EffectType.Animated)
        {
            AnimationType = animationEffectType;
        }

        [ScriptName("type")]
        [IntrinsicProperty]
        public CardGameAppearanceAnimatedEffectType AnimationType { get; set; }

        [ScriptName("duration")]
        [IntrinsicProperty]
        public int Duration { get; set; }

        [ScriptName("ease")]
        [IntrinsicProperty]
        public CardGameAppearanceAnimatedEffectEase Ease { get; set; }
    }

    [ScriptName("AnimatedEffectEase")]
    [NamedValues]
    public enum CardGameAppearanceAnimatedEffectEase
    {
        Linear,
        Swing,
        EaseInQuad,
        EaseOutQuad,
        EaseInOutQuad,
        EaseInCubic,
        EaseOutCubic,
        EaseInOutCubic,
        EaseInQuart,
        EaseOutQuart,
        EaseInOutQuart,
        EaseInQuint,
        EaseOutQuint,
        EaseInOutQuint,
        EaseInSine,
        EaseOutSine,
        EaseInOutSine,
        EaseInExpo,
        EaseOutExpo,
        EaseInOutExpo,
        EaseInCirc,
        EaseOutCirc,
        EaseInOutCirc,
        EaseInElastic,
        EaseOutElastic,
        EaseInOutElastic,
        EaseInBack,
        EaseOutBack,
        EaseInOutBack,
        EaseInBounce,
        EaseOutBounce,
        EaseInOutBounce,
    }

    [ScriptName("AnimatedEffectType")]
    public enum CardGameAppearanceAnimatedEffectType
    {
        Between
    }

    [ScriptName("AnimatedEffect$Between")]
    public class CardGameAppearanceAnimatedEffectBetweenProperties : CardGameAppearanceAnimatedEffect
    {
        public CardGameAppearanceAnimatedEffectBetweenProperties()
            : base(CardGameAppearanceAnimatedEffectType.Between)
        {
            From = new CardGameAppearanceEffectStyleProperty();
            To = new CardGameAppearanceEffectStyleProperty();

        }

        public CardGameAppearanceEffectStyleProperty From { get; set; }
        public CardGameAppearanceEffectStyleProperty To { get; set; }
    }

}