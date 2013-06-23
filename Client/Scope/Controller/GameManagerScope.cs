using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
namespace Client.Scope.Controller
{       
    public class GameManagerScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public GameManagerModel Model { get; set; } 
    }
    [Serializable]
    public class GameManagerModel
    {
    }
}