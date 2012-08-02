using System.Runtime.CompilerServices;

namespace global
{
    //[NamedValues]todo:::
    [ScriptName("CardState")]
    public enum CardGameCardState
    {
        [ScriptName("faceUp")] FaceUp = 0,
        [ScriptName("faceDown")] FaceDown = 1,
        [ScriptName("faceUpIfOwned")] FaceUpIfOwned = 2
    }
}