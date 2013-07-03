using System;
using System.Runtime.CompilerServices;
using global;

namespace Client.Scope.Directive
{
    public class TestCardScope : TestSpaceScope
    {
        [IntrinsicProperty]
        public CardGameCard Card { get; set; }
        [IntrinsicProperty]
        public dynamic CardStyle { get; set; }
        [IntrinsicProperty]
        public Action CardClick { get; set; } 
    }
}