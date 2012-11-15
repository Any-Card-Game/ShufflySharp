using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("PokerResult")]
    public class CardGamePokerResult
    {
        [ScriptName("weight")]
        [IntrinsicProperty]
        public double Weight { get; set; }
        [ScriptName("state")]
        [IntrinsicProperty]
        public CardGamePokerWinType Type { get; set; }
        [ScriptName("cards")]
        [IntrinsicProperty]
        public List<CardGameCard> Cards { get; set; }

        public CardGamePokerResult(double weight, CardGamePokerWinType type, List<CardGameCard> cards)
        {
            Weight = weight;
            Type = type;
            Cards = cards;
        }
    }
}