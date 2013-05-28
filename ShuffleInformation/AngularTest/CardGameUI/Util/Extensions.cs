using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace CardGameUI.Util
{
    public static class Extensions
    {
        public static T RandomElement<T>(this List<T> arr)
        {
            return arr[(int)Math.Floor(Math.Random() * arr.Count)];

        }

        [InlineCode("{script}")]
        [InstanceMethodOnFirstArgument]
        public static dynamic Me(this object script)
        {
            return script;

        }

    }
}