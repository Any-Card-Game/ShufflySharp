using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("PokerWinType")]
    public enum CardGamePokerWinType
    {
        Straight = 1,
        Flush = 2,
        Pair = 3,
        ThreeOfAKind = 4,
        FourOfAKind = 5,
        StraightFlush = 6
    }
}