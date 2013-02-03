using System.Runtime.CompilerServices;
namespace global
{
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
}