using System;
using System.Runtime.CompilerServices;
namespace ShuffUI
{
    [Serializable]
    public class VisibleChangedEvent
    {
        [IntrinsicProperty]
        public bool Visible { get; set; }

        public VisibleChangedEvent(bool visible)
        {
            Visible = visible;
        }
    }
}