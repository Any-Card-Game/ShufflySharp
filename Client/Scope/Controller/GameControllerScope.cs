using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
using global;
namespace Client.Scope.Controller
{
    public class GameControllerScope : BaseScope
    {
        [IntrinsicProperty]
        public GameCardGame MainArea { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        public Action MoveCard { get; set; }
        [IntrinsicProperty]
        public Action AnimateCard { get; set; } 

    }
}