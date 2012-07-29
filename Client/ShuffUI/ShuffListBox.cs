using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffListBox : ShuffElement
    {
        public string Label { get; set; }

        public Action<dynamic> Click { get; set; }

        public List<dynamic> Items { get; set; }
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