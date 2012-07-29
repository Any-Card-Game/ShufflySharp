using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    public class ShuffElement
    {
        private bool visible;

        public ShuffElement()
        {
            visible = true;
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
            get { return visible; }
            set
            {
                if (Element != null)
                    Element.CSS("display", visible ? "block" : "none");
                visible = value;
            }
        }
    }

    public class Number
    {
        private string Value;

        private Number(string s)
        {
            Value = s;
        }

        private Number(double s)
        {
            Value = s.ToString();
        }

        public static implicit operator double(Number d)
        {
            return double.Parse(d.Value);
        }

        public static implicit operator Number(string d)
        {
            return new Number(d);
        }

        public static implicit operator Number(double d)
        {
            return new Number(d);
        }

        public static implicit operator string(Number d)
        {
            return d.Value;
        }
    }
}