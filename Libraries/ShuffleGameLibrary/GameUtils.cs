using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace global
{
    [ScriptName("_")]
    public static class GameUtils
    {
        [ScriptName("numbers")]
        public static int[] Numbers(int start, int finish)
        {
            var items = new int[finish - start];

            for (var i = 0; i < finish - start; i++) {
                items[i] = start + i;
            }
            return items;
        }

        [ScriptName("clone")]
        public static dynamic Clone(object obj) //::dynamic okay
        {
            if (obj == null || ( !( obj is Array ) && ( obj.GetType() != typeof (object) && "({}).toString.call(obj) != '[object Function]'".eval() ) )) return obj;

            var ob = (JsDictionary<string, object>) obj;
            dynamic temp = null; //::dynamic okay

            if (obj is Array)
                temp = new dynamic[0]; //::dynamic okay
            else
                temp = new object();

            foreach (var key in ob.Keys) {
                temp[key] = Clone(ob[key]);
            }

            return temp;
        }

        [ScriptName("floor")]
        public static int Floor(double j)
        {
            return (int) j;
        }

        [ScriptName("random")]
        public static double Random()
        {
            return Math.Random();
        }
    }
}