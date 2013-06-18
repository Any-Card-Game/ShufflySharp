using System;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
using global;
namespace CardGameUI.Scope
{
    public class CardScope : BaseScope
    {
        [IntrinsicProperty]
        public CardGameCard Card { get; set; } 
        [IntrinsicProperty]
        public dynamic CardStyle { get; set; } 
        [IntrinsicProperty]
        public Action CardClick { get; set; }
        [IntrinsicProperty]
        public CardGameTableSpace Space { get; set; }
        [IntrinsicProperty]
        [ScriptName("$parent")]
        public SpaceScope Parent { get; set; }
    }
}