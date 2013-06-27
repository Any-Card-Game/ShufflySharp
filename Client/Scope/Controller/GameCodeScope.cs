using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
namespace Client.Scope.Controller
{


    public class GameCodeScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameCodeModel Model { get; set; }
    }
  
    [Serializable]
    public class GameCodeModel
    { 
    }
}