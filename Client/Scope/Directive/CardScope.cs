using System;
using System.Runtime.CompilerServices;
using global;
namespace Client.Scope.Directive
{
    public class CardScope : BaseScope
    {
        [IntrinsicProperty]
        public CardGameCard Card { get; set; }
        [IntrinsicProperty]
        public dynamic CardStyle { get; set; } 
        [IntrinsicProperty]
        public CardGameTableSpace Space { get; set; }
        [IntrinsicProperty]
        [ScriptName("$parent")]
        public SpaceScope Parent { get; set; }
    }
}