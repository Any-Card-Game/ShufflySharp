using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffWindow : ShuffElement
    {
        [IntrinsicProperty]
        public dynamic Instance { get; set; }

        [IntrinsicProperty]
        public List<ShuffElement> Elements { get; set; }

        [IntrinsicProperty]
        public string Title { get; set; }

        [IntrinsicProperty]
        public int X { get; set; }

        [IntrinsicProperty]
        public int Y { get; set; }

        [IntrinsicProperty]
        public int Width { get; set; }

        [IntrinsicProperty]
        public bool AllowClose { get; set; }

        [IntrinsicProperty]
        public int Height { get; set; }

        [IntrinsicProperty]
        public bool AllowMinimize { get; set; }

        [IntrinsicProperty]
        public bool Visible { get; set; }

        public ShuffWindow()
        {
            Elements = new List<ShuffElement>();
        }
        public void AddButton(ShuffElement element)
        {
            Elements.Add(element);
        }
    }
}