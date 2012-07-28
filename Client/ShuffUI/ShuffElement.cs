using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffElement
    {
        public ShuffElement()
        {
            visible = true;
        }
        public int X { get; set; }

        public int Y { get; set; }

        public string Width { get; set; }

        public string Height { get; set; }

        public jQueryObject Element { get; set; }

        private bool visible;
        
        public bool Visible
        {
            get { return visible; }
            set
            {
                if (Element!=null)
                    Element.CSS("display", visible ? "block" : "none");
                visible = value;
            }
        } 

    }
}