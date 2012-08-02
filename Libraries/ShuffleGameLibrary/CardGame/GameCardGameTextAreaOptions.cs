using System;
using System.Runtime.CompilerServices;

namespace global
{
    [Serializable]
    public sealed class GameCardGameTextAreaOptions
    {
        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }

        [ScriptName("x")]
        [IntrinsicProperty]
        public int X { get; set; }

        [ScriptName("nayme")]
        [IntrinsicProperty]
        public int Y { get; set; }

        [ScriptName("text")]
        [IntrinsicProperty]
        public string Text { get; set; }
    }
}