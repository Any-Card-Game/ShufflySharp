using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("Card")]
    public class CardGameCard
    { 
        [IntrinsicProperty]
        public int Value { get; set; } 
        [IntrinsicProperty]
        public int Type { get; set; }
        [IntrinsicProperty]
        public CardGameCardState State { get; set; }
        [IntrinsicProperty]
        public CardGameAppearance Appearance { get; set; }

        public CardGameCard(int value, int type)
        {
            Value = value;
            Type = type;
            Appearance = new CardGameAppearance();
        }
    }
}