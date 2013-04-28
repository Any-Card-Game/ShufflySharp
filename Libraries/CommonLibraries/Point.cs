using System.Runtime.CompilerServices;
namespace CommonLibraries
{
    public class Point
    {
        [IntrinsicProperty]
        public double X { get; set; }
        [IntrinsicProperty]
        public double Y { get; set; }

        public Point(double x, double y)
        {
            X = x;
            Y = y;
        }
    }
    public class IntPoint
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }

        public IntPoint(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}