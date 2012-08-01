using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CommonLibraries;

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
            ChainedEffect = (ef);
            return ef;
        }

        public virtual void Build(Element em)
        {
            ///Window.Alert("bad1");
        }
        public virtual void TearDown(Element em)
        {
            ///Window.Alert("bad2");
        }

        public static CardGameAppearanceEffect FromJson(CardGameAppearanceEffect effect)
        {
            CardGameAppearanceEffect ef;
            switch (effect.Type)
            {
                case EffectType.Highlight:
                    ef = new CardGameAppearanceEffectHighlight(new CardGameEffectHighlightOptions()
                        {
                            Color = effect.me().color,
                            OffsetX = effect.me().offsetX ?? 0,
                            OffsetY = effect.me().offsetY ?? 0,
                            Radius = effect.me().radius??0,
                            Rotate = effect.me().rotate??0,
                        });
                    break;
                case EffectType.Rotate:
                    ef = new CardGameAppearanceEffectRotate(new CardGameEffectRotateOptions()
                    {
                        Degrees = effect.me().degrees??0,
                    });
                    break;
                case EffectType.Bend:
                    ef = new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
                    {
                        Degrees = effect.me().degrees??0,
                    });
                    break;
                case EffectType.StyleProperty:
                    ef = null;
                    break;
                case EffectType.Animated:
                    ef = null;
                    break;
                default:
                    ef = null;
                    break;
            }
            if (ef.ChainedEffect!=null)
            ef.ChainedEffect = FromJson(effect.ChainedEffect);

            return ef;
        }
    }
    [NamedValues]
    public enum CardGameAppearanceEffectDrawTime
    {
        Pre, During, Post
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