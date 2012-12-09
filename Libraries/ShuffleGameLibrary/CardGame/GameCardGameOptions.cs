using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace global
{
    [Serializable]
    public class GameCardGameOptions
    {
        [IntrinsicProperty]
        public int NumberOfCards { get; set; }
        [IntrinsicProperty]
        public int NumberOfJokers { get; set; }
        [IntrinsicProperty]
        public Size Size { get; set; }
    }
}