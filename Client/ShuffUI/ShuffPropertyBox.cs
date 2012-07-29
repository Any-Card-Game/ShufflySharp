using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffPropertyBox : ShuffElement
    {
        public Action<dynamic> addItem;

        [IntrinsicProperty]
        public List<dynamic> items { get; set; }
        public Func<dynamic, int, jQueryObject> ItemCreation { get; set; }
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