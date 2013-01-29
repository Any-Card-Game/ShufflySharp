using System;
using System.Runtime.CompilerServices;
namespace global
{
    [Serializable]
    public class Rectangle
    { 
        public double X { get; set; } 
        public double Y { get; set; } 
        public double Width { get; set; } 
        public double Height { get; set; }
        
        [ObjectLiteral]
        public Rectangle(double x, double y, double width, double height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }
    }
}