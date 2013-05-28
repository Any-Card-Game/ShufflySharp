using System;
using System.Runtime.CompilerServices;
using Client.Angular.interfaces;
using global;
namespace AngularTest.scope
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
        [ScriptName("$parent")]
        public SpaceScope Parent { get; set; }
    }
}