using System;
using System.Runtime.CompilerServices;
namespace WebLibraries.Common.ShuffUI
{
    [Serializable]
    public class ButtonClickedEvent
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }

        public ButtonClickedEvent(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}