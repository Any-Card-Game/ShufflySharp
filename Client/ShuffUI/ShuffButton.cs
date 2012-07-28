using System;

namespace Client.ShuffUI
{
    public class ShuffButton : ShuffElement
    {
        public int X { get; set; }

        public int Y { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public string Text { get; set; }

        public Action<ShuffClickEvent> Click { get; set; }
    }
}