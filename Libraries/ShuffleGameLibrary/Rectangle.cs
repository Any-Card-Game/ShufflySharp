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

        public double Right
        {
            get
            {
                return X + Width;
            }
            set
            {
                Width = value - X;
            }

        }
        public double Bottom
        {
            get
            {
                return Y + Height;
            }
            set
            {
                Height = value - Y;
            }
        }

        [ObjectLiteral]
        public Rectangle(double x, double y, double width, double height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }

        public Rectangle Expand(int i)
        {
            return new Rectangle(X - i, Y - i, Width + i, Height + i);
        } 

        public  new string ToString()
        {
            return string.Format("X: {0}, Y: {1}, Width: {2}, Height: {3}", X, Y, Width, Height);
        }

        public bool Contains(Rectangle rect)
        {

            if (rect.X < this.X + this.Width && this.X < rect.X + rect.Width && rect.Y < this.Y + this.Height)
                return this.Y < rect.Y + rect.Height;
            else
                return false;
        }

        public Rectangle Offset(double x, double y)
        {
            return new Rectangle(X + x, Y + y, Width, Height);
        }
    }
}