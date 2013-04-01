using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using CommonLibraries;
using NodeLibraries.Common.Charm;
namespace CommonServerLibraries
{
    public  class ProgressBar
    {
        private readonly Charm myCharm;
        private float myCurValue;
        public float MinValue { get; set; }
        public float MaxValue { get; set; }
        public float CurValue
        {
            get { return myCurValue; }
            set { myCurValue = value;
                redraw();
            }
        }

        private void redraw()
        {

            myCharm.Background(CharmColors.Cyan);
            myCharm.Position(X - 1, Y - 1);
            for (int i = 0; i <= Width + 2; i++)
            {
                myCharm.Write(" ");
            }

            myCharm.Position(X - 1, Y + 1);
            for (int i = 0; i <= Width + 2; i++)
            {
                myCharm.Write(" ");
            }

            myCharm.Position(X + Width + 1, Y);
            myCharm.Write(" ");

            myCharm.Position(X - 1, Y);
            myCharm.Write(" ");

            myCharm.Background(CharmColors.Red);

            int w = (int) ( CurValue / ( MaxValue - MinValue ) * Width );
            for (int i = 0; i < w; i++) {
                myCharm.Write(" ");
            }


            myCharm.Background(CharmColors.Black);


        }

        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public ProgressBar(Charm charm,int minValue,int maxValue)
        {
            MinValue = minValue;
            MaxValue = maxValue;
            myCharm = charm;
        }


      }

}