using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffTextBox: ShuffElement
    {

        public string LabelStyle { get; set; }

        public string Label { get; set; }
        public string Text { get; set; }


    }
    public class ShuffTextBox<T>: ShuffElement 
    {
        public ShuffTextBox(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
        public string LabelStyle { get; set; }

        public string Label { get; set; }
        public string Text { get; set; }


    }


}