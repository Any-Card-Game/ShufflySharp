using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("domUtils")]
    public static class DomUtils
    {
        public static double nopx(this string ar)
        {
            if (ar == null)
                return 0;
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
            return double.Parse(ar.Replace("rotate(", "").Replace("deg)", "")); //todo regex??
        }
    }
}