using System;
using System.Runtime.CompilerServices;
using WebLibraries.ShuffUI.ShuffUI;
namespace Client.Scope
{
    public class FloatingWindowBaseScope : BaseScope
    {
        [IntrinsicProperty]
        public Action<SwingDirection,bool,Action> SwingAway { get; set; }
        [IntrinsicProperty]
        public Action<Action> SwingBack { get; set; }
        [IntrinsicProperty]
        public bool Visible { get; set; }
     }
}