using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffButton : ShuffElement
    {
        [IntrinsicProperty]
        public string Text { get; set; }

        [IntrinsicProperty]
        public jQueryEventHandler Click { get; set; }
    }

    public class ShuffButton<T> : ShuffButton
    {
        public ShuffButton(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }
}