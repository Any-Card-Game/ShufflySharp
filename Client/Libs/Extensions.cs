using System;
using System.Collections.Generic;
using jQueryApi;

namespace Client.Libs
{
    public static class Extensions
    {
        public static T RandomElement<T>(this List<T> arr)
        {
            return arr[(int) Math.Floor(Math.Random()*arr.Count)];
        }

        public static jQueryObject FuckingClone(this jQueryObject elem)
        {
            var pos = elem.GetOffset();

            var m = elem.Clone();
            m.CSS("left", -999999);
            m.CSS("top", -999999);
            jQuery.Select("body").Append(m);
            var curTransformX = m.Position().Left;
            var curTransformY = m.Position().Top;

            var oldRot = m.GetCSS("-webkit-transform");
            m.CSS("-webkit-transform", "");
            curTransformX = m.Position().Left - curTransformX;
            curTransformY = m.Position().Top - curTransformY;
            m.CSS("-webkit-transform", oldRot);
            m.CSS("left", pos.Left + curTransformX);
            m.CSS("top", pos.Top + curTransformY);
            return m;
        }
    }
}