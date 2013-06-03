using System;
using System.Runtime.CompilerServices;
using WebLibraries.ShuffUI.ShuffUI;
namespace CardGameUI.Scope
{
    public class FloatingWindowBaseScope : BaseScope
    {
        [IntrinsicProperty]
        public Action<SwingDirection,bool> SwingAway { get; set; }
        [IntrinsicProperty]
        public Action SwingBack { get; set; }
        [IntrinsicProperty]
        public bool Visible { get; set; }
     }
}