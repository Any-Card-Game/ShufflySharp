using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffCodeEditor : ShuffElement
    {

        public bool LineNumbers { get; set; }
    }
    public class ShuffCodeEditor<T> : ShuffElement 
    {
        public ShuffCodeEditor(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
        public bool LineNumbers { get; set; }
    }

}