using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffTextBox : ShuffElement
    {
        [IntrinsicProperty]
        public string LabelStyle { get; set; }

        [IntrinsicProperty]
        public string Label { get; set; }

        [IntrinsicProperty]
        public string Text { get; set; }
    }

    public class ShuffTextBox<T> : ShuffTextBox
    {
        public ShuffTextBox(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }
}