using System;
using System.Runtime.CompilerServices;
namespace global
{
    [Serializable]
    public class GameCardGameTextAreaOptions
    { 
        public string Name { get; set; } 
        public int X { get; set; } 
        public int Y { get; set; } 
        public string Text { get; set; }
    }
}