using System;
using System.Runtime.CompilerServices;
using CommonsLibraries;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class STDIn : EventEmitter
    {
        public void Resume() {}
        public void Once(string data, Action<string> function) {}
    }
}