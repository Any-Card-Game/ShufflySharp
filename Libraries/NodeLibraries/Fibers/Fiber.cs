using System;
using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.Fibers
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("Fiber")]
    
    public class Fiber<T> : NodeModule
    {
        public Fiber(Func<T, bool> action) {}

        public static T Yield(object obj = null)
        {
            return default( T );
        }

        
        public T2 Run<T2>(object obj)
        {
            return default(T2);
        }
       public void Reset()
        {
        }

        
        public T2 Run<T2>()
        {
            return default( T2 );
        }
    }
}