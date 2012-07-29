using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace global
{
    [ScriptName("_")]
    public static class GameUtils
    {
        [ScriptName("numbers")]
        public static int[] Numbers(int start, int finish)
        {
            int[] items = new int[finish - start];

            for (int i = 0; i < finish - start; i++)
            {
                items[i] = start + i;
            }
            return items;

        }
        [ScriptName("clone")]
        public static dynamic Clone(object obj)
        {
            if (obj == null || obj.GetType() == typeof(object)) return obj;

            JsDictionary<string,object> ob = (JsDictionary<string, object>) obj;
            dynamic temp;

            if (obj is Array)
            {
                temp = new dynamic[0];
            }
            else
            {
                temp = new object();
            }


            foreach (var key in ob.Keys)
            {
                temp[key] = Clone(ob[key]);
            }

            return temp;
        }
        [ScriptName("floor")]
        public static int Floor(double j)
        {
            return (int)j;
        }
        [ScriptName("random")]
        public static double Random()
        {
            return Math.Random();
        }
         
    }
}
