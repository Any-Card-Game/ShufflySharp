using System;
using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class STDIn : EventEmitter
    {
        public void Resume() {}
        public void Once(string data, Action<string> function) {}
    }
}