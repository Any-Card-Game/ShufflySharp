using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported]
    public class STDOut : EventEmitter
    {
        public void Write(string question) {}
    }
}