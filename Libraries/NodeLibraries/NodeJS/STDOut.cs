using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class STDOut : EventEmitter
    {
        public void Write(string question) {}
    }
}