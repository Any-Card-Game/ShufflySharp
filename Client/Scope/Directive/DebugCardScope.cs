using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Scope.Controller;
using CommonLibraries;
using global;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Directive
{
    public class DebugCardScope : BaseScope
    {

        [IntrinsicProperty]
        public DebugGameModel GameModel { get; set; }

        [IntrinsicProperty]
        public DebugSpaceCard Card { get; set; }


        [IntrinsicProperty]
        public List<string> Classes { get; set; }

         

        [IntrinsicProperty]
        public DebugSpace Space { get; set; }

        [IntrinsicProperty]
        public dynamic CardStyle { get; set; }

        [IntrinsicProperty]
        public Action CardClick { get; set; }
    }
     
}