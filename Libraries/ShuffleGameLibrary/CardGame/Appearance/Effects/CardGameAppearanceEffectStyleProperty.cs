using System.Runtime.CompilerServices;
namespace global
{
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
}