using System.Runtime.CompilerServices;
namespace global
{
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
}