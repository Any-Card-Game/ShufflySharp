using System;
using System.Runtime.CompilerServices;
namespace WebLibraries.Common.ShuffUI
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