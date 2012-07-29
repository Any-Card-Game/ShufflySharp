using System.Runtime.CompilerServices;

namespace CommonLibraries
{
    public class Point
    {
        public Point(double x, double y)
        {
            X = x;
            Y = y;
        }

        [IntrinsicProperty]
        public double X { get; set; }

        [IntrinsicProperty]
        public double Y { get; set; }
    }
}