using System.Html;
using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Effect$Highlight")]
    public class CardGameAppearanceEffectHighlight : CardGameAppearanceEffect
    {

        public CardGameAppearanceEffectHighlight(CardGameEffectHighlightOptions options)
            : base(EffectType.Highlight)
        {
            Radius = options.Radius == 0 ? 0 : options.Radius;
            Color = options.Color == null ? "yellow" : options.Color;
            Rotate = options.Rotate == 0 ? 0 : options.Rotate;
            OffsetX = options.OffsetX == 0 ? 0 : options.OffsetX;
            OffsetY = options.OffsetY == 0 ? 0 : options.OffsetY;
            DrawTime = CardGameAppearanceEffectDrawTime.Pre;
        }

        [ScriptName("radius")]
        [IntrinsicProperty]
        public double Radius { get; set; }

        [ScriptName("color")]
        [IntrinsicProperty]
        public string Color { get; set; }

        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }

        [ScriptName("offsetX")]
        [IntrinsicProperty]
        public double OffsetX { get; set; }

        [ScriptName("offsetY")]
        [IntrinsicProperty]
        public double OffsetY { get; set; }

        public override void Build(Element em)
        {
            em.Style.Padding = string.Format("{0} {0} {0} {0}", (Radius).px());
            em.Style.BackgroundColor = Color;
            /// Window.Alert("good1");


        }
        public override void TearDown(Element em)
        {
            ///     Window.Alert("good2");

            double paddingRadius = Radius / 2;
            em.Style.Left = (em.Style.Left.nopx() - paddingRadius).px();
            em.Style.Top = (em.Style.Top.nopx() - paddingRadius).px();

            for (int i = 0; i < em.ChildNodes.Length; i++)
            {
                if (em.ChildNodes[i].TagName == "DIV")
                {
                    em.ChildNodes[i].Style.Left = (em.ChildNodes[i].Style.Left.nopx() + paddingRadius).px();
                    em.ChildNodes[i].Style.Top = (em.ChildNodes[i].Style.Top.nopx() + paddingRadius).px();

                }
            }
        }

    }


    [Record]
    public sealed class CardGameEffectHighlightOptions
    {
        [ScriptName("radius")]
        [IntrinsicProperty]
        public double Radius { get; set; }

        [ScriptName("color")]
        [IntrinsicProperty]
        public string Color { get; set; }

        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }

        [ScriptName("offsetX")]
        [IntrinsicProperty]
        public double OffsetX { get; set; }

        [ScriptName("offsetY")]
        [IntrinsicProperty]
        public double OffsetY { get; set; }
    }

}