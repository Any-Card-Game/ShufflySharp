using System;
using System.Runtime.CompilerServices;
namespace WebLibraries.Common.ShuffUI
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