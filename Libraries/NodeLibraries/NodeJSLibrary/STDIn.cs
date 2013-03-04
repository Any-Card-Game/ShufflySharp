using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported]
    public class STDIn : EventEmitter
    {
        public void Resume() {}
        public void Once(string data, Action<string> function) {}
    }
}