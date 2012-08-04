using System;
using System.Html;
using CommonLibraries;
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

        public override void Build(CardDrawing e)
        {

            var em = e.OuterElement;

            em.Style.Padding = string.Format("{0} {0} {0} {0}", (Radius).px());
            em.Style.BackgroundColor = Color;
            em.Style.BackgroundColor = Color;
            em.Style.Border = "solid 2px black";

            /// Window.Alert("good1");

            em.Style ["border-radius"] = 15.0.px();
            em.Style ["box-shadow"] = "4px 4px 2px #333";


        }
        public override void Build(SpaceDrawing e)
        {
            var em = e.OuterElement;

            em.Style.Padding = string.Format("{0} {0} {0} {0}", (Radius).px());
            em.Style.BackgroundColor = Color;
            em.Style.Border = "solid 2px black";
            /// Window.Alert("good1");

            em.Style ["border-radius"] = 15.0.px();
            em.Style ["box-shadow"] = "4px 4px 2px #333";
             
        }

        public override void TearDown(CardDrawing e)
        {

            var em = e.OuterElement;

            ///     Window.Alert("good2");

            double paddingRadiusL = em.Style.PaddingLeft.nopx();
            double paddingRadiusT = em.Style.PaddingTop.nopx();
            em.Style.Left = (em.Style.Left.nopx() - em.Style.PaddingLeft.nopx()).px();
            em.Style.Top = (em.Style.Top.nopx() - em.Style.PaddingTop.nopx()).px();

            for (int i = 0; i < em.ChildNodes.Length; i++)
            {
                if (em.ChildNodes[i].TagName == "DIV")
                {
                    em.ChildNodes[i].Style.Left = (em.ChildNodes[i].Style.Left.nopx() + paddingRadiusL).px();
                    em.ChildNodes[i].Style.Top = (em.ChildNodes[i].Style.Top.nopx() + paddingRadiusT).px();

                }
            } 
        }

        public override void TearDown(SpaceDrawing e)
        {
            var em = e.OuterElement;

            ///     Window.Alert("good2");

            double paddingRadiusL = em.Style.PaddingLeft.nopx();
            double paddingRadiusT = em.Style.PaddingTop.nopx();
            em.Style.Left = (em.Style.Left.nopx() - em.Style.PaddingLeft.nopx()).px();
            em.Style.Top = (em.Style.Top.nopx() - em.Style.PaddingTop.nopx()).px();
            for (int i = 0; i < em.ChildNodes.Length; i++)
            {
                if (em.ChildNodes[i].TagName == "DIV")
                {
                    em.ChildNodes[i].Style.Left = (em.ChildNodes[i].Style.Left.nopx() + paddingRadiusL).px();
                    em.ChildNodes[i].Style.Top = (em.ChildNodes[i].Style.Top.nopx() + paddingRadiusT).px();

                }
            }

        }

    }


    [Serializable]
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