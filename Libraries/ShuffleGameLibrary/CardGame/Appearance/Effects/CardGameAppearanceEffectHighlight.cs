using System;
using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("Effect$Highlight")]
    public class CardGameAppearanceEffectHighlight : CardGameAppearanceEffect
    {
        [IntrinsicProperty]
        public double Radius { get; set; }
        [IntrinsicProperty]
        public string Color { get; set; }
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [IntrinsicProperty]
        public double OffsetX { get; set; }
        [IntrinsicProperty]
        public double OffsetY { get; set; }

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

        public override void Build(CardDrawing e)
        {
            var em = e.OuterElementStyle;

            em.Padding = string.Format("{0} {0} {0} {0}", ( Radius ).px());
            em.BackgroundColor = Color;
            em.Border = "solid 2px black";
            em.Left = ( em.Left.nopx() - Radius ).px();
            em.Top = ( em.Top.nopx() - Radius ).px();

            /// Window.Alert("good1");

            em.BorderRadius = 15.0.px();
            em.BoxShadow = "4px 4px 2px #333";
        }

        public override void Build(SpaceDrawing e)
        {
            var cur = new InternalStyle();

            cur.AddChild(e.OuterElementStyle);
            e.OuterElementStyle = cur;

            var em = e.OuterElementStyle;
            em.Padding = string.Format("{0} {0} {0} {0}", ( Radius ).px());
            em.BackgroundColor = Color;
            em.Border = "solid 2px black";
            /// Window.Alert("good1");

            em.Left = ( em.Left.nopx() - Radius ).px();
            em.Top = ( em.Top.nopx() - Radius ).px();

            em.BorderRadius = 15.0.px();
            em.BoxShadow = "4px 4px 2px #333";
        }

        public override void TearDown(CardDrawing e)
        {
/*
            var em = e.OuterElementStyle;

            ///     Window.Alert("good2");
            
            double paddingRadiusL = em.PaddingLeft.nopx();
            double paddingRadiusT = em.PaddingTop.nopx();
            em.Left = ( em.Left.nopx() - em.PaddingLeft.nopx() ).px();
            em.Top = ( em.Top.nopx() - em.PaddingTop.nopx() ).px();

            for (int i = 0; i < e.OuterElement.ChildNodes.Length; i++) {
                var childNode = e.OuterElement.ChildNodes[i];

                if (childNode.TagName == "DIV") {
                    childNode.Style.Left = ( childNode.Style.Left.nopx() + paddingRadiusL ).px();
                    childNode.Style.Top = ( childNode.Style.Top.nopx() + paddingRadiusT ).px();
                }
            }
*/
        }

        public override void TearDown(SpaceDrawing e)
        {
/*
            var em = e.OuterElementStyle;

            ///     Window.Alert("good2");

            double paddingRadiusL = em.PaddingLeft.nopx();
            double paddingRadiusT = em.PaddingTop.nopx();
            em.Left = ( em.Left.nopx() - em.PaddingLeft.nopx() ).px();
            em.Top = ( em.Top.nopx() - em.PaddingTop.nopx() ).px();

            for (int i = 0; i < e.OuterElement.ChildNodes.Length; i++) {
                var childNode = e.OuterElement.ChildNodes[i];
                if (childNode.TagName == "DIV") {
                    childNode.Style.Left = (childNode.Style.Left.nopx() + paddingRadiusL).px();
                    childNode.Style.Top = (childNode.Style.Top.nopx() + paddingRadiusT).px();
                }
            }
*/
        }
    }
    [Serializable]
    public class CardGameEffectHighlightOptions
    {
        public double Radius { get; set; }
        public string Color { get; set; }
        public double Rotate { get; set; }
        public double OffsetX { get; set; }
        public double OffsetY { get; set; }
    }
}