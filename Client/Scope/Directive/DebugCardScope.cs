using System;
using System.Runtime.CompilerServices;
using global;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{
    public class DebugCardScope : DebugSpaceScope
    {
        [IntrinsicProperty]
        public CardGameCard Card { get; set; }

        [IntrinsicProperty]
        public dynamic CardStyle { get; set; }

        [IntrinsicProperty]
        public Action CardClick { get; set; }
    }
     
}