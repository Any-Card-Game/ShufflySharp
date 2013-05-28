using System;
using System.Runtime.CompilerServices;
using Client.Angular.interfaces;
using global;
namespace AngularTest.scope
{
    public class GameCtrlScope : BaseScope
    {
        [IntrinsicProperty]

        public GameCardGame MainArea { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        public Action MoveCard { get; set; }
        [IntrinsicProperty]
        public CardGameCard SelectedCard { get; set; }

    }
}