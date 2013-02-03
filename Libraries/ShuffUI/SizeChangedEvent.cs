using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace ShuffUI
{
    [Serializable]
    public class SizeChangedEvent
    {
        [IntrinsicProperty]
        public Number Width { get; set; }
        [IntrinsicProperty]
        public Number Height { get; set; }

        public SizeChangedEvent(Number w, Number h)
        {
            Width = w;
            Height = h;
        }
    }
}