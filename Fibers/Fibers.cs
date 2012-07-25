// Class1.cs
//

using System;
using System.Html;
using System.Runtime.CompilerServices;
using NodeJSLibrary;

namespace FibersLibrary
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("Fiber")]
    public class Fiber<T> : NodeModule
    {
        public Fiber(Func<T, bool> action)
        {

        }

        public T2 Run<T2>(object obj)
        {
            return default(T2);
        }
        public T2 Run<T2>()
        {
            return default(T2);
        }
    }
}
