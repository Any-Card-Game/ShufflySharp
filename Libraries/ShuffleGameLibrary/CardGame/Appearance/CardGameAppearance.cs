using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Appearance")]
    public class CardGameAppearance : CardGameAppearanceStyle
    {
        public CardGameAppearance()
        {
            Effects=new List<CardGameAppearanceEffect>();
        }


        [ScriptName("effects")]
        [IntrinsicProperty]
        public List<CardGameAppearanceEffect> Effects { get; set; }
    }
    [ScriptName("AppearanceStyle")]
    public class CardGameAppearanceStyle
    {
        public CardGameAppearanceStyle()
        {
            OuterStyle = new CardGameAppearanceStyleItem();
            InnerStyle = new CardGameAppearanceStyleItem();
        }

        [ScriptName("outerStyle")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleItem OuterStyle { get; set; }
        [ScriptName("innerStyle")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleItem InnerStyle { get; set; }

    }
    [ScriptName("AppearanceStyleItem")]
    public class CardGameAppearanceStyleItem
    {
        public CardGameAppearanceStyleItem()
        {
            BackColor = null;
            ZIndex = 0;
            Border = new CardGameAppearanceStyleBorder();
            Padding = new CardGameAppearanceStylePadding();
            Margin = new CardGameAppearanceStyleMargin();
            Cursor = new CardGameAppearanceStyleCursor();
            Rotate = 0;
        }

        [ScriptName("backColor")]
        [IntrinsicProperty]
        public string BackColor { get; set; }

        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }

        [ScriptName("backColor")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorder Border { get; set; }

        [ScriptName("padding")]
        [IntrinsicProperty]
        public CardGameAppearanceStylePadding Padding { get; set; }

        [ScriptName("margin")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleMargin Margin { get; set; }

        [ScriptName("zindex")]
        [IntrinsicProperty]
        public int ZIndex { get; set; }

        [ScriptName("cursor")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleCursor Cursor { get; set; }

    }
    [NamedValues]

    public enum CardGameAppearanceStyleCursor
    {
        Default, Auto, Pointer, Move, EResize, NEResize, NWResize, NResize, SEResize, SWResize, SResize, WResize, Text, Wait, Help
    }

    [ScriptName("AppearanceStyleMargin")]
    public class CardGameAppearanceStyleMargin
    {
        public CardGameAppearanceStyleMargin()
        {
            Top = 0;
            Bottom = 0;
            Left = 0;
            Right = 0;
            All = 0;
        }

        [ScriptName("top")]
        [IntrinsicProperty]
        public double Top { get; set; }
        [ScriptName("bottom")]
        [IntrinsicProperty]
        public double Bottom { get; set; }
        [ScriptName("left")]
        [IntrinsicProperty]
        public double Left { get; set; }
        [ScriptName("right")]
        [IntrinsicProperty]
        public double Right { get; set; }
        [ScriptName("all")]
        [IntrinsicProperty]
        public double All { get; set; }
    }

    [ScriptName("AppearanceStylePadding")]
    public class CardGameAppearanceStylePadding
    {
        public CardGameAppearanceStylePadding()
        {
            Top = 0;
            Bottom = 0;
            Left = 0;
            Right = 0;
            All = 0;
        }

        [ScriptName("top")]
        [IntrinsicProperty]
        public double Top { get; set; }
        [ScriptName("bottom")]
        [IntrinsicProperty]
        public double Bottom { get; set; }
        [ScriptName("left")]
        [IntrinsicProperty]
        public double Left { get; set; }
        [ScriptName("right")]
        [IntrinsicProperty]
        public double Right { get; set; }
        [ScriptName("all")]
        [IntrinsicProperty]
        public double All { get; set; }
    }


    [ScriptName("AppearanceStyleBorder")]
    public class CardGameAppearanceStyleBorder
    {
        public CardGameAppearanceStyleBorder()
        {
            Top = new CardGameAppearanceStyleBorderArea();
            Bottom = new CardGameAppearanceStyleBorderArea();
            Left = new CardGameAppearanceStyleBorderArea();
            Right = new CardGameAppearanceStyleBorderArea();
            All = new CardGameAppearanceStyleBorderArea();

        }

        [ScriptName("top")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Top { get; set; }
        [ScriptName("bottom")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Bottom { get; set; }
        [ScriptName("left")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Left { get; set; }
        [ScriptName("right")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Right { get; set; }
        [ScriptName("all")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea All { get; set; }
    }
    [ScriptName("AppearanceStyleBorderArea")]
    public class CardGameAppearanceStyleBorderArea
    {
        public CardGameAppearanceStyleBorderArea()
        {
            Color = "#FFF";
            Radius = "0px";
            Width = "0px";
            Style = CardGameAppearanceStyleBorderStyle.None;
        }

        [ScriptName("color")]
        [IntrinsicProperty]
        public string Color { get; set; }
        [ScriptName("radius")]
        [IntrinsicProperty]
        public string Radius { get; set; }
        [ScriptName("width")]
        [IntrinsicProperty]
        public string Width { get; set; }
        [ScriptName("style")]
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderStyle Style { get; set; }

    }
    [NamedValues]

    public enum CardGameAppearanceStyleBorderStyle
    {
        None, Dotted, Dashed, Solid, Double, Groove, Ridge, Inset, Offset
    }
}