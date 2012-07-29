using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffListBox : ShuffElement
    {
        public string Label { get; set; }

        public Action<ShuffListItem> Click { get; set; }

        public List<ShuffListItem> Items { get; set; }
    }

    public class ShuffListItem
    {
        public string Label { get; set; }
        public int Value { get; set; }

        public ShuffListItem(string label, int value)
        {
            Label = label;
            Value = value;
        }
    }

    public class ShuffListBox<T> : ShuffListBox
    {
        public ShuffListBox(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }

    }
}