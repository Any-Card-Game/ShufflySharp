using System.Runtime.CompilerServices;
namespace global
{
    public class Rectangle
    {
        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }
        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }
        [ScriptName("width")]
        [IntrinsicProperty]
        public double Width { get; set; }
        [ScriptName("height")]
        [IntrinsicProperty]
        public double Height { get; set; }

        public Rectangle(double x, double y, double width, double height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }
    }
}