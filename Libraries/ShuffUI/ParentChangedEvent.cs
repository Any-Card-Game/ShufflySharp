using System;
using System.Runtime.CompilerServices;
namespace ShuffUI
{
    [Serializable]
    public class ParentChangedEvent
    {
        [IntrinsicProperty]
        public ShuffPanel Parent { get; set; }

        public ParentChangedEvent(ShuffPanel parent)
        {
            Parent = parent;
        }
    }
}