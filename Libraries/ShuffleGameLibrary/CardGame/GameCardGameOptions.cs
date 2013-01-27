using System;
using CommonLibraries;
namespace global
{
    [Serializable]
    public class GameCardGameOptions
    {
        public int NumberOfCards { get; set; }
        public int NumberOfJokers { get; set; }
        public Size Size { get; set; }
    }
}