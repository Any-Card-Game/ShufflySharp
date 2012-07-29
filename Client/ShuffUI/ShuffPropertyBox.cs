using System;
using System.Html;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffPropertyBox : ShuffElement
    {
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