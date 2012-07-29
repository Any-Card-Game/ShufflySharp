using System;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffButton: ShuffElement
    {
        public string Text { get; set; }

        public jQueryEventHandler Click { get; set; }


    }

    public class ShuffButton<T> : ShuffElement 
    {
        public ShuffButton(T data)
        {
            Data=data;
        }
        [IntrinsicProperty]
        public T Data { get; set; }
        public string Text { get; set; }
        public jQueryEventHandler Click { get; set; }
    }

}