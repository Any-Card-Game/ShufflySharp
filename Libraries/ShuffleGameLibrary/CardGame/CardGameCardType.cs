using System.Runtime.CompilerServices;
namespace global
{
    //[NamedValues]todo:::
    [ScriptName("CardType")]
    public enum CardGameCardType
    {
        [ScriptName("heart")] Heart = 0,
        [ScriptName("diamond")] Diamond = 1,
        [ScriptName("spade")] Spade = 2,
        [ScriptName("club")] Club = 3
    }
}