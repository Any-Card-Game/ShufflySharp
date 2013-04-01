using System;
using System.Collections.Generic;
using CommonLibraries;
using NodeLibraries.NodeJS;
namespace NodeLibraries.Common.Charm
{
    public static class Charmer
    {
        public static Charm Setup()
        {
            var ch = Global.Require<Func<Charm>>("charm");
            var charm = ch();
            charm.Cursor(false);
            charm.Pipe(Global.Process.STDOut);
            charm.Reset();
            charm.On("^C", () => {
                               charm.Foreground(CharmColors.White);
                               charm.Background(CharmColors.Black);
                               charm.Position(0, 100);
                               Global.Process.Exit();
                           });


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
}