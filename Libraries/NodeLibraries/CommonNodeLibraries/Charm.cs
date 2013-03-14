using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using NodeJSLibrary;
namespace CommonNodeLibraries
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("charm")]
    
    public class Charm : EventEmitter,NodeModule
    {


        public Charm Reset()
        {
            return this;
        }

        public Charm Pipe(STDOut stdOut)
        {
            return this;
        }
        public Charm Destroy()
        {
            return this;
        }
        public Charm End()
        {
            return this;
        }
        public Charm Write(object message)
        {
            return this;
        }
        public Charm Position(int x, int y)
        {
            return this;
        }
        public Charm Position(Action<int, int> callback)
        {
            return this;
        }
        public Charm Move(int x, int y)
        {
            return this;
        }
        public Charm Up(int y)
        {
            return this;
        }
        public Charm Down(int y)
        {
            return this;
        }

        public Charm Left(int x)
        {
            return this;
        }
        public Charm Right(int x)
        {
            return this;
        }


        public Charm Push(bool withAttributes = false)
        {
            return this;
        }
        public Charm Pop(bool withAttributes = false)
        {
            return this;
        }
        public Charm Erase(EraseType type)
        {
            return this;
        }
        public Charm Display(DisplayType type)
        {
            return this;
        }
        public Charm Foreground(CharmColors color)
        {
            return this;
        }
        public Charm Foreground(string color)
        {
            return this;
        }
        public Charm Foreground(int color)
        {
            return this;
        }
        public Charm Background(CharmColors color)
        {
            return this;
        }
        public Charm Background(string color)
        {
            return this;
        }
        public Charm Background(int color)
        {
            return this;
        }
        public Charm Cursor(bool visible)
        {
            return this;
        }
  
         
    }
    [NamedValues]

    public enum EraseType
    {
        [ScriptName("end")]
        End,
        [ScriptName("start")]
        Start,
        [ScriptName("line")]
        Line,
        [ScriptName("down")]
        Down,
        [ScriptName("Up")]
        Up,
        [ScriptName("screen")]
        Screen
    }


    [NamedValues]

    public enum DisplayType
    {
        [ScriptName("reset")]
        Reset,
        [ScriptName("bright")]
        Bright,
        [ScriptName("dim")]
        Dim,
        [ScriptName("underscore")]
        Underscore,
        [ScriptName("blink")]
        Blink,
        [ScriptName("reverse")]
        Reverse,
        [ScriptName("hidden")]
        Hidden
    }

    public static class Charmer
    {
        public static Charm Setup()
        {
            var ch = Global.Require<Func<Charm>>("charm");
            var charm = ch();

            charm.Pipe(Global.Process.STDOut);
            charm.Reset();
            charm.On("^C", Global.Process.Exit);

            return charm;
        }
        public static void TestSpinner()
        {
            var charm = Setup();



            var radius = 10.0;
            var theta = 0.0;
            var points = new List<Point>();

            var iv = Global.SetInterval(() =>
            {
                var x = 2 + (radius + Math.Cos(theta) * radius) * 2;
                var y = 2 + radius + Math.Sin(theta) * radius;

                points.Insert(0, new Point(x, y));
                var colors = new string[] { "red", "yellow", "green", "cyan", "blue", "magenta" };

                for (int i = 0; i < points.Count; i++)
                {
                    var p = points[i];
                    charm.Position((int)p.X, (int)p.Y);
                    var c = colors[(int)Math.Floor(i / 12.0)];
                    charm.Background(c).Write(" ");


                }


                points = new List<Point>((Point[])points.Slice(0, 12 * colors.Length - 1));

                theta += Math.PI / 40.0;
            }, 50);

            
        }
    }


    [NamedValues]
    public enum CharmColors
    {
        [ScriptName("red")]
        Red,
        [ScriptName("cyan")]
        Cyan,
        [ScriptName("yellow")]
        Yellow,
        [ScriptName("green")]
        Green,
        [ScriptName("blue")]
        Blue,
        [ScriptName("magenta")]
        Magenta,
        [ScriptName("black")]
        Black,
        [ScriptName("white")]
        White
    }
}