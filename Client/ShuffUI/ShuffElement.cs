using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffElementOLD
    {
        private bool myVisible;

        public ShuffElementOLD()
        {
            myVisible = true;
        }

        [IntrinsicProperty]
        public int X { get; set; }

        [IntrinsicProperty]
        public int Y { get; set; }

        [IntrinsicProperty]
        public Number Width { get; set; }

        //todo override intrinsic property

        [IntrinsicProperty]
        public Number Height { get; set; }

        [IntrinsicProperty]
        public jQueryObject Element { get; set; }

        public bool Visible
        {
            get { return myVisible; }
            set
            {
                if (Element != null)
                    Element.CSS("display", myVisible ? "block" : "none");
                myVisible = value;
            }
        }
    }
}