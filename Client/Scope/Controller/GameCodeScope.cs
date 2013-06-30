using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
using Models.SiteManagerModels.Game;

namespace Client.Scope.Controller
{


    public class GameCodeScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameCodeModel Model { get; set; }
    }
  
 }