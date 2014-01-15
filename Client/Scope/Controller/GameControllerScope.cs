using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Services;
using CommonLibraries;
using global;

namespace Client.Scope.Controller
{
    public class GameControllerScope : ManagedScope
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

    public class DebugGameControllerScope : ManagedScope
    {

        [IntrinsicProperty]
        public DebugGameModel GameModel { get; set; }
          

        [IntrinsicProperty]
        public Action MoveCard { get; set; }

        [IntrinsicProperty]
        public Action AnimateCard { get; set; }
    }
    public class DebugGameModel
    {

        [IntrinsicProperty]
        public GameCardGame MainArea { get; set; }

        [IntrinsicProperty]
        public List<DebugSpace> Spaces { get; set; }

        [IntrinsicProperty]
        public Point Scale { get; set; } 
    }
}