using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffPropertyBox : ShuffElement
    {
        [IntrinsicProperty]
        public Action<ShuffListItem> addItem { get; set; }

        [IntrinsicProperty]
        public List<ShuffListItem> items { get; set; }

        [IntrinsicProperty]
        public Func<ShuffListItem, int, jQueryObject> ItemCreation { get; set; }
    }

    public class ShuffPropertyBox<T> : ShuffPropertyBox
    {
        public ShuffPropertyBox(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }
}