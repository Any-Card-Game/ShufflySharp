// Class1.cs
//

using System;
using System.Html;
using System.Runtime.CompilerServices;
using NodeJS;

namespace Fibers
{
    public class Fiber<T> : NodeModule
    {
        public Fiber(Func<T, bool> action)
        {

        }
    }
}
