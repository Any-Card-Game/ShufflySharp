using System;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
using global;
namespace CardGameUI.Scope
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
        public Action AnimateCard { get; set; }
        [IntrinsicProperty]
        public CardGameCard SelectedCard { get; set; }

    }
}