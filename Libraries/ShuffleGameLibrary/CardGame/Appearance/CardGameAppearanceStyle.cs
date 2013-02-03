using System.Runtime.CompilerServices;
namespace global
{
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
}