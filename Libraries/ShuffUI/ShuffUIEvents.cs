using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace ShuffUI
{
    public delegate void ShuffUIEvent<T>(T t);
    [Serializable]
    public class PositionChangedEvent
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }

        public PositionChangedEvent(int x, int y)
        {
            X = x;
            Y = y;
        }
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
        [IntrinsicProperty]
        public ShuffPanel Parent { get; set; }

        public ParentChangedEvent(ShuffPanel parent)
        {
            Parent = parent;
        }
    }
}