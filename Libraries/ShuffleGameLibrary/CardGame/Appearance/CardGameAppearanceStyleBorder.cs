using System.Runtime.CompilerServices;
namespace global
{
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
}