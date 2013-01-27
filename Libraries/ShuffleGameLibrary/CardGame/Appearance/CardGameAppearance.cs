using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("Appearance")]
    public class CardGameAppearance : CardGameAppearanceStyle
    {
        [IntrinsicProperty]
        public List<CardGameAppearanceEffect> Effects { get; set; }

        public CardGameAppearance()
        {
            Effects = new List<CardGameAppearanceEffect>();
        }

        public static CardGameAppearance FromJson(CardGameAppearance json)
        {
            CardGameAppearance ap = new CardGameAppearance();
            ap.InnerStyle = CardGameAppearanceStyleItem.FromJson(json.InnerStyle);
            ap.OuterStyle = CardGameAppearanceStyleItem.FromJson(json.OuterStyle);
            ap.Effects = new List<CardGameAppearanceEffect>();
            if (json.Effects != null) {
                foreach (var effect in json.Effects) {
                    ap.Effects.Add(CardGameAppearanceEffect.FromJson(effect));
                }
            }

            return ap;
        }
    }
    [ScriptName("AppearanceStyle")]
    public class CardGameAppearanceStyle
    {
        [IntrinsicProperty]
        public CardGameAppearanceStyleItem OuterStyle { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleItem InnerStyle { get; set; }

        public CardGameAppearanceStyle(CardGameAppearanceStyleItem outersStyle, CardGameAppearanceStyleItem innerStyle)
        {
            OuterStyle = outersStyle;
            InnerStyle = innerStyle;
        }

        public CardGameAppearanceStyle()
        {
            OuterStyle = new CardGameAppearanceStyleItem(new {});
            InnerStyle = new CardGameAppearanceStyleItem(new {});
        }
    }
    [ScriptName("AppearanceStyleItem")]
    public class CardGameAppearanceStyleItem
    {
        [IntrinsicProperty]
        public string BackColor { get; set; }
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorder Border { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStylePadding Padding { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleMargin Margin { get; set; }
        [ScriptName("zindex")]
        [IntrinsicProperty]
        public int ZIndex { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleCursor Cursor { get; set; }

        public CardGameAppearanceStyleItem(dynamic options)
        {
            if (options == null) options = new {};
            BackColor = options.backColor ?? null;
            ZIndex = options.zIndex ?? 0;
            Border = options.border ?? new CardGameAppearanceStyleBorder();
            Padding = options.padding ?? new CardGameAppearanceStylePadding();
            Margin = options.margin ?? new CardGameAppearanceStyleMargin();
            Cursor = options.cursor ?? new CardGameAppearanceStyleCursor();
            Rotate = 0;
        }

        public static CardGameAppearanceStyleItem FromJson(CardGameAppearanceStyleItem st)
        {
            CardGameAppearanceStyleItem si = new CardGameAppearanceStyleItem(new {});
            si.BackColor = st.BackColor;
            si.Border = CardGameAppearanceStyleBorder.FromJson(st.Border);
            si.Cursor = st.Cursor;
            si.Margin = CardGameAppearanceStyleMargin.FromJson(st.Margin);
            si.Padding = CardGameAppearanceStylePadding.FromJson(st.Padding);
            si.Rotate = st.Rotate;
            si.ZIndex = st.ZIndex;

            return si;
        }
    }
    //[NamedValues]todo:::
    public enum CardGameAppearanceStyleCursor
    {
        Default,
        Auto,
        Pointer,
        Move,
        EResize,
        NEResize,
        NWResize,
        NResize,
        SEResize,
        SWResize,
        SResize,
        WResize,
        Text,
        Wait,
        Help
    }
    [ScriptName("AppearanceStyleMargin")]
    public class CardGameAppearanceStyleMargin
    {
        [IntrinsicProperty]
        public double Top { get; set; }
        [IntrinsicProperty]
        public double Bottom { get; set; }
        [IntrinsicProperty]
        public double Left { get; set; }
        [IntrinsicProperty]
        public double Right { get; set; }
        [IntrinsicProperty]
        public double All { get; set; }

        public CardGameAppearanceStyleMargin()
        {
            Top = 0;
            Bottom = 0;
            Left = 0;
            Right = 0;
            All = 0;
        }

        public static CardGameAppearanceStyleMargin FromJson(CardGameAppearanceStyleMargin st)
        {
            CardGameAppearanceStyleMargin sp = new CardGameAppearanceStyleMargin();
            sp.All = st.All;
            sp.Bottom = st.Bottom;
            sp.Left = st.Left;
            sp.Right = st.Right;
            sp.Top = st.Top;
            return sp;
        }
    }
    [ScriptName("AppearanceStylePadding")]
    public class CardGameAppearanceStylePadding
    {
        [IntrinsicProperty]
        public double Top { get; set; }
        [IntrinsicProperty]
        public double Bottom { get; set; }
        [IntrinsicProperty]
        public double Left { get; set; }
        [IntrinsicProperty]
        public double Right { get; set; }
        [IntrinsicProperty]
        public double All { get; set; }

        public CardGameAppearanceStylePadding()
        {
            Top = 0;
            Bottom = 0;
            Left = 0;
            Right = 0;
            All = 0;
        }

        public static CardGameAppearanceStylePadding FromJson(CardGameAppearanceStylePadding st)
        {
            CardGameAppearanceStylePadding sp = new CardGameAppearanceStylePadding();
            sp.All = st.All;
            sp.Bottom = st.Bottom;
            sp.Left = st.Left;
            sp.Right = st.Right;
            sp.Top = st.Top;
            return sp;
        }
    }
    [ScriptName("AppearanceStyleBorder")]
    public class CardGameAppearanceStyleBorder
    {
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Top { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Bottom { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Left { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea Right { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderArea All { get; set; }

        public CardGameAppearanceStyleBorder()
        {
            Top = new CardGameAppearanceStyleBorderArea();
            Bottom = new CardGameAppearanceStyleBorderArea();
            Left = new CardGameAppearanceStyleBorderArea();
            Right = new CardGameAppearanceStyleBorderArea();
            All = new CardGameAppearanceStyleBorderArea();
        }

        public static CardGameAppearanceStyleBorder FromJson(CardGameAppearanceStyleBorder st)
        {
            CardGameAppearanceStyleBorder sp = new CardGameAppearanceStyleBorder();
            sp.All = st.All;
            sp.Bottom = st.Bottom;
            sp.Left = st.Left;
            sp.Right = st.Right;
            sp.Top = st.Top;
            return sp;
        }
    }
    [ScriptName("AppearanceStyleBorderArea")]
    public class CardGameAppearanceStyleBorderArea
    {
        [IntrinsicProperty]
        public string Color { get; set; }
        [IntrinsicProperty]
        public string Radius { get; set; }
        [IntrinsicProperty]
        public string Width { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderStyle Style { get; set; }

        public CardGameAppearanceStyleBorderArea()
        {
            Color = "#FFF";
            Radius = "0px";
            Width = "0px";
            Style = CardGameAppearanceStyleBorderStyle.None;
        }
    }
    //[NamedValues]todo:::
    public enum CardGameAppearanceStyleBorderStyle
    {
        None,
        Dotted,
        Dashed,
        Solid,
        Double,
        Groove,
        Ridge,
        Inset,
        Offset
    }
}