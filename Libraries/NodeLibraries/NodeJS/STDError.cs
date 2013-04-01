using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("STDErr")]
    public class STDError : EventEmitter
    {
        public void Write(string question) {}
    }
}