using System.Runtime.CompilerServices;
namespace global
{
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
}