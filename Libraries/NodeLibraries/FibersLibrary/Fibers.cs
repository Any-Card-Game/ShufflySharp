using System;
using System.Runtime.CompilerServices;
using NodeJSLibrary;

namespace FibersLibrary
{
    [IgnoreNamespace] 
    [Imported(IsRealType = true)]
    [ScriptName("Fiber")]
    [IgnoreGenericArguments]

    public class Fiber<T> : NodeModule
    {
        [ScriptAlias("yield")]
        public static T Yield(object obj=null)
        {
            return default(T);
        }
        public Fiber(Func<T, bool> action)
        {

        }
        [IgnoreGenericArguments]
        public T2 Run<T2>(object obj)
        {
            return default(T2);
        }
        [IgnoreGenericArguments]
        public T2 Run<T2>()
        {
            return default(T2);
        }
    }
}
