using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;

namespace global
{
    [ScriptName("domUtils")]
    public static class DomUtils
    {
        public static double nopx(this string ar) 
        {
            return double.Parse(ar.Replace("px", ""));
        }
        public static string px(this double ar) 
        {
            return ar + "px";
        }
        public static string transformRadius(this double ar)
        {
            return string.Format("rotate({0}deg)", ar);
        }
        public static double noTransformRadius(this string ar)
        {
            return double.Parse(ar.Replace("rotate(", "").Replace("deg)", ""));//todo regex??
        }
    }
}