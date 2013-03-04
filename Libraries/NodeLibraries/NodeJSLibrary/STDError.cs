using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("STDErr")]
    public class STDError : EventEmitter
    {
        public void Write(string question) {}
    }
}