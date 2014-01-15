using System;
using System.Collections.Generic;
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
        public Guid Guid { get; set; }
        [IntrinsicProperty]
        public CardGameCardState State { get; set; }
        [IntrinsicProperty]
        public List<string> Effects { get; set; }

        public CardGameCard(int value, int type)
        {
            Value = value;
            Type = type;
            Effects = new List<string>();
            Guid=Guid.NewGuid();

        }
    }
}