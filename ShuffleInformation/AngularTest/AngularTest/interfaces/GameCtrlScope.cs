using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using global;
using ng;
namespace Client.Angular.interfaces
{

    public class EffectEditorScope : BaseScope
    {
        [IntrinsicProperty]
        public string NewEffect { get; set; }
        [IntrinsicProperty]
        public Action AddEffect { get; set; }
        [IntrinsicProperty]
        public List<string> Effects { get; set; } 
    }
    public class GameCtrlScope : BaseScope
    {
        [IntrinsicProperty]

        public GameCardGame MainArea { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        public Action MoveCard { get; set; }

    }
    public class CardScope : BaseScope
    {
        [IntrinsicProperty]
        public CardGameCard Card { get; set; }
        [IntrinsicProperty]
        public CardGameTableSpace Space { get; set; }
        [IntrinsicProperty]
        public dynamic CardStyle { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }

    }
    public class SpaceScope : BaseScope
    { 
        [IntrinsicProperty]
        public CardGameTableSpace Space { get; set; }
        [IntrinsicProperty]
        public dynamic SpaceStyle { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }

    }
    
    [Serializable]
    public class Point
    {
        public double X { get; set; }
        public double Y { get; set; }

    }
}