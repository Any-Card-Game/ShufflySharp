using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace global
{
    [ScriptName("Effect")]
    public class CardGameAppearanceEffect
    {
        [IntrinsicProperty]
        public EffectType Type { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceEffectDrawTime DrawTime { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceEffect ChainedEffect { get; set; }

        public CardGameAppearanceEffect(EffectType type)
        {
            Type = type;
            DrawTime = CardGameAppearanceEffectDrawTime.Pre;
        }

        public CardGameAppearanceEffect ChainEffect(CardGameAppearanceEffect ef)
        {
            ChainedEffect = ( ef );
            return ef;
        }

        public virtual void Build(CardDrawing m)
        {
            ///Window.Alert("bad1");
        }

        public virtual void TearDown(CardDrawing m)
        {
            ///Window.Alert("bad2");
        }

        public virtual void Build(SpaceDrawing m)
        {
            ///Window.Alert("bad1");
        }

        public virtual void TearDown(SpaceDrawing em)
        {
            ///Window.Alert("bad2");
        }

        public static CardGameAppearanceEffect FromJson(CardGameAppearanceEffect effect)
        {
            CardGameAppearanceEffect ef;
            switch (effect.Type) {
                case EffectType.Highlight:
                    ef = new CardGameAppearanceEffectHighlight(new CardGameEffectHighlightOptions() {
                                                                                                            Color = effect.me().color,
                                                                                                            OffsetX = effect.me().offsetX ?? 0,
                                                                                                            OffsetY = effect.me().offsetY ?? 0,
                                                                                                            Radius = effect.me().radius ?? 0,
                                                                                                            Rotate = effect.me().rotate ?? 0,
                                                                                                    });
                    break;
                case EffectType.Rotate:
                    ef = new CardGameAppearanceEffectRotate(new CardGameEffectRotateOptions() {
                                                                                                      Degrees = effect.me().degrees ?? 0,
                                                                                              });
                    break;
                case EffectType.Bend:
                    ef = new CardGameAppearanceEffectBend(new CardGameEffectBendOptions() {
                                                                                                  Degrees = effect.me().degrees ?? 0,
                                                                                          });
                    break;
                case EffectType.StyleProperty:
                    ef = new CardGameAppearanceEffectStyleProperty(new CardGameAppearanceStyle());
                    var jm = ef;
                    "jm.style=effect.style".eval();
                    break;
                case EffectType.Animated:
                    ef = null;
                    break;
                default:
                    ef = null;
                    break;
            }
            if (ef.ChainedEffect != null)
                ef.ChainedEffect = FromJson(effect.ChainedEffect);

            return ef;
        }
    }
    public class CardDrawing
    {
        [IntrinsicProperty]
        public Element OuterElement { get; set; }
        [IntrinsicProperty]
        public InternalStyle OuterElementStyle { get; set; }

        public CardDrawing(Element item1)
        {
            OuterElement = item1;
            OuterElementStyle = new InternalStyle();
        }
    }
    public class SpaceDrawing
    {
        [IntrinsicProperty]
        public InternalStyle OuterElementStyle { get; set; }
        [IntrinsicProperty]
        public Element OuterElement { get; set; }
        [IntrinsicProperty]
        public List<CardDrawing> ChildNodes { get; set; }

        public SpaceDrawing(Element item1)
        {
            OuterElement = item1;
            ChildNodes = new List<CardDrawing>();
            OuterElementStyle = new InternalStyle();
        }
    }
    //[NamedValues]todo:::
    public enum EffectType
    {
        Highlight,
        Rotate,
        Bend,
        StyleProperty,
        Animated
    }
    //[NamedValues]todo:::
    public enum CardGameAppearanceEffectDrawTime
    {
        Pre,
        During,
        Post
    }
    [ScriptName("Effect$StyleProperty")]
    public class CardGameAppearanceEffectStyleProperty : CardGameAppearanceEffect
    {
        [IntrinsicProperty]
        public CardGameAppearanceStyle Style { get; set; }

        public CardGameAppearanceEffectStyleProperty(CardGameAppearanceStyle style)
                : base(EffectType.StyleProperty)
        {
            Style = style;
        }

        public override void Build(CardDrawing m)
        {
            if (Style == null) return;
            m.OuterElementStyle.BackgroundColor = Style.OuterStyle.BackColor;
            if (Style.OuterStyle.Border != null) {
                if (Style.OuterStyle.Border.Left != null) {
                    m.OuterElementStyle.BorderLeftColor = Style.OuterStyle.Border.Left.Color;
                    m.OuterElementStyle.BorderLeftStyle = Style.OuterStyle.Border.Left.Style.ToString();
                    m.OuterElementStyle.BorderLeftWidth = Style.OuterStyle.Border.Left.Width;
                }
                if (Style.OuterStyle.Border.Top != null) {
                    m.OuterElementStyle.BorderTopColor = Style.OuterStyle.Border.Top.Color;
                    m.OuterElementStyle.BorderTopStyle = Style.OuterStyle.Border.Top.Style.ToString();
                    m.OuterElementStyle.BorderTopWidth = Style.OuterStyle.Border.Top.Width;
                }
                if (Style.OuterStyle.Border.Right != null) {
                    m.OuterElementStyle.BorderRightColor = Style.OuterStyle.Border.Right.Color;
                    m.OuterElementStyle.BorderRightStyle = Style.OuterStyle.Border.Right.Style.ToString();
                    m.OuterElementStyle.BorderRightWidth = Style.OuterStyle.Border.Right.Width;
                }
                if (Style.OuterStyle.Border.Bottom != null) {
                    m.OuterElementStyle.BorderBottomColor = Style.OuterStyle.Border.Bottom.Color;
                    m.OuterElementStyle.BorderBottomStyle = Style.OuterStyle.Border.Bottom.Style.ToString();
                    m.OuterElementStyle.BorderBottomWidth = Style.OuterStyle.Border.Bottom.Width;
                }
            }
        }

        public override void TearDown(CardDrawing m)
        {
            base.TearDown(m);
        }

        public override void Build(SpaceDrawing m)
        {
            if (Style == null) return;

            m.OuterElementStyle.BackgroundColor = Style.OuterStyle.BackColor;
        }

        public override void TearDown(SpaceDrawing em)
        {
            base.TearDown(em);
        }
    }
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
    [ScriptName("AnimatedEffectEase")]
    //[NamedValues]todo:::
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