using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffLabel : ShuffElement
    {

        public string Text { get; set; }
 
    }

    public class ShuffLabel<T> : ShuffElement 
    {
        public ShuffLabel(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }

        public string Text { get; set; }

    }

}