using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffListBox : ShuffElement
    {
        [IntrinsicProperty]
        public string Label { get; set; }

        [IntrinsicProperty]
        public Action<ShuffListItem> Click { get; set; }

        [IntrinsicProperty]
        public List<ShuffListItem> Items { get; set; }
    }

    public class ShuffListItem
    {
        public ShuffListItem(string label, int value)
        {
            Label = label;
            Value = value;
        }

        [IntrinsicProperty]
        public string Label { get; set; }

        [IntrinsicProperty]
        public int Value { get; set; }
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