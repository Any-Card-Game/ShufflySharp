using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffPropertyBox : ShuffElement
    {
        public Action<ShuffListItem> addItem;

        [IntrinsicProperty]
        public List<ShuffListItem> items { get; set; }
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