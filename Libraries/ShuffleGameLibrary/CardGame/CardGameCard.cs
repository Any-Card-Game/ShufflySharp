using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Card")]
    public class CardGameCard
    {
        public CardGameCard(int value, int type)
        {
            Value = value;
            Type = type;
            Appearance=new CardGameAppearance();
        }

        [ScriptName("value")]
        [IntrinsicProperty]
        public int Value { get; set; }

        [ScriptName("type")]
        [IntrinsicProperty]
        public int Type { get; set; }

        [ScriptName("state")]
        [IntrinsicProperty]
        public CardGameCardState State { get; set; }

        [ScriptName("appearance")]
        [IntrinsicProperty]
        public CardGameAppearance Appearance { get; set; }

    }
}