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
            switch (effect.Type)
            {
                case EffectType.Highlight:
                    ef = new CardGameAppearanceEffectHighlight(new CardGameEffectHighlightOptions()
                        {
                            Color = effect.me().color,
                            OffsetX = effect.me().offsetX ?? 0,
                            OffsetY = effect.me().offsetY ?? 0,
                            Radius = effect.me().radius ?? 0,
                            Rotate = effect.me().rotate ?? 0,
                        });
                    break;
                case EffectType.Rotate:
                    ef = new CardGameAppearanceEffectRotate(new CardGameEffectRotateOptions()
                    {
                        Degrees = effect.me().degrees ?? 0,
                    });
                    break;
                case EffectType.Bend:
                    ef = new CardGameAppearanceEffectBend(new CardGameEffectBendOptions()
                    {
                        Degrees = effect.me().degrees ?? 0,
                    });
                    break;
                case EffectType.StyleProperty:
                    ef = new CardGameAppearanceEffectStyleProperty(new CardGameAppearanceStyle());
                    var jm = ef;
                    ExtensionMethods.eval("jm.style=effect.style"); 
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
        public CardDrawing(Element item1, ImageElement item2)
        {
            OuterElement = item1;
            Image = item2;
        }

        [IntrinsicProperty]
        public Element OuterElement { get; set; }
        [IntrinsicProperty]
        public ImageElement Image { get; set; }

        //public MyStyle OuterElementStyle { get; set; }
        //public MyStyle ImageStyle { get; set; }
    }
    public class SpaceDrawing
    {
        public SpaceDrawing(Element item1)
        {
            OuterElement = item1;
            ChildNodes = new List<CardDrawing>();

        }
        // public MyStyle OuterElementStyle { get; set; }
        [IntrinsicProperty]
        public Element OuterElement { get; set; }
        [IntrinsicProperty]

        public List<CardDrawing> ChildNodes { get; set; }
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
        Pre, During, Post
    }
    [ScriptName("Effect$StyleProperty")]
    public class CardGameAppearanceEffectStyleProperty : CardGameAppearanceEffect
    {


        public override void Build(CardDrawing m)
        {
            if (Style == null) return;
            m.OuterElement.Style.BackgroundColor = this.Style.OuterStyle.BackColor;
            if (this.Style.OuterStyle.Border != null)
            {
                if (this.Style.OuterStyle.Border.Left != null)
                {
                    m.OuterElement.Style.BorderLeftColor = this.Style.OuterStyle.Border.Left.Color;
                    m.OuterElement.Style.BorderLeftStyle = this.Style.OuterStyle.Border.Left.Style.ToString();
                    m.OuterElement.Style.BorderLeftWidth = this.Style.OuterStyle.Border.Left.Width;
                }
                if (this.Style.OuterStyle.Border.Top != null)
                {
                    m.OuterElement.Style.BorderTopColor = this.Style.OuterStyle.Border.Top.Color;
                    m.OuterElement.Style.BorderTopStyle = this.Style.OuterStyle.Border.Top.Style.ToString();
                    m.OuterElement.Style.BorderTopWidth = this.Style.OuterStyle.Border.Top.Width;
                }
                if (this.Style.OuterStyle.Border.Right != null)
                {
                    m.OuterElement.Style.BorderRightColor = this.Style.OuterStyle.Border.Right.Color;
                    m.OuterElement.Style.BorderRightStyle = this.Style.OuterStyle.Border.Right.Style.ToString();
                    m.OuterElement.Style.BorderRightWidth = this.Style.OuterStyle.Border.Right.Width;
                }
                if (this.Style.OuterStyle.Border.Bottom != null)
                {
                    m.OuterElement.Style.BorderBottomColor = this.Style.OuterStyle.Border.Bottom.Color;
                    m.OuterElement.Style.BorderBottomStyle = this.Style.OuterStyle.Border.Bottom.Style.ToString();
                    m.OuterElement.Style.BorderBottomWidth = this.Style.OuterStyle.Border.Bottom.Width;
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

            m.OuterElement.Style.BackgroundColor = this.Style.OuterStyle.BackColor;
        }

        public override void TearDown(SpaceDrawing em)
        {
            base.TearDown(em);
        }

        public CardGameAppearanceEffectStyleProperty(CardGameAppearanceStyle style)
            : base(EffectType.StyleProperty)
        {
            Style = style;
        }

        [ScriptName("style")]
        [IntrinsicProperty]
        public CardGameAppearanceStyle Style { get; set; }
    }

    [ScriptName("AnimatedEffect")]
    public class CardGameAppearanceAnimatedEffect : CardGameAppearanceEffect
    {

        public CardGameAppearanceAnimatedEffect(CardGameAppearanceAnimatedEffectType animationEffectType,int duration,CardGameAppearanceAnimatedEffectEase ease)
            : base(EffectType.Animated)
        {
            Ease = ease;
            AnimationType = animationEffectType;
            Duration = duration;
        }

        [ScriptName("type")]
        [IntrinsicProperty]
        public CardGameAppearanceAnimatedEffectType AnimationType { get; set; }

        [ScriptName("duration")]
        [IntrinsicProperty]
        public int Duration { get; set; }
        [ScriptName("pauseAfter")]
        [IntrinsicProperty]
        public int PauseAfter { get; set; }
        [ScriptName("pauseBefore")]
        [IntrinsicProperty]
        public int PauseBefore { get; set; }

        [ScriptName("ease")]
        [IntrinsicProperty]
        public CardGameAppearanceAnimatedEffectEase Ease { get; set; }
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
        public CardGameAppearanceAnimatedEffectBetweenProperties(int duration,CardGameAppearanceAnimatedEffectEase ease)
            : base(CardGameAppearanceAnimatedEffectType.Between,duration,ease)
        {
            From = new CardGameAppearanceEffectStyleProperty(new CardGameAppearanceStyle());
            To = new CardGameAppearanceEffectStyleProperty(new CardGameAppearanceStyle());

        }

        [IntrinsicProperty]
        public CardGameAppearanceEffectStyleProperty From { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceEffectStyleProperty To { get; set; }
    }

}