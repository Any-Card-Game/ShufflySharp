using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace Client.ShuffUI
{

    public delegate void ShuffUIEvent<T>(T t);



    [Serializable]
    public class PositionChangedEvent
    {
        public PositionChangedEvent(int x, int y)
        {
            X = x;
            Y = y;
        }

        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
    }

    [Serializable]
    public class ItemClickedEvent
    {
        public ShuffListItem Item { get; set; }

        public ItemClickedEvent(ShuffListItem item)
        {
            Item = item;
        }
    }
    [Serializable]
    public class SizeChangedEvent
    {
        public SizeChangedEvent(Number w, Number h)
        {
            Width = w;
            Height = h;
        }

        [IntrinsicProperty]
        public Number Width { get; set; }
        [IntrinsicProperty]
        public Number Height { get; set; }
    }
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
    [Serializable]
    public class TextChangedEvent
    {

        [IntrinsicProperty]
        public string Text { get; set; }

        [IntrinsicProperty]
        public bool Live { get; set; }
        public TextChangedEvent(string text, bool live)
        {
            Live = live;
            Text = text;
        }

    }
    [Serializable]
    public class ParentChangedEvent
    {
        public ParentChangedEvent(ShuffPanel parent)
        {
            Parent = parent;
        }
        [IntrinsicProperty]
        public ShuffPanel Parent { get; set; }
    }
}
