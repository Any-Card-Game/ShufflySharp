using System.Html;
using System.Runtime.CompilerServices;

namespace Client.ShuffUI
{
    public class ShuffCodeEditor : ShuffElement
    {
         
        public ShuffCodeEditor()
        {
            Width = "100%";
            Height = "100%"; 
        }
        public bool LineNumbers { get; set; }
    }
    public class ShuffCodeEditor<T> : ShuffCodeEditor 
    {
        public ShuffCodeEditor(T data)
        {
            Data = data;
        }


        [IntrinsicProperty]
        public T Data { get; set; } 
    }

}