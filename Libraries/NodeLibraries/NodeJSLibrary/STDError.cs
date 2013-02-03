using System.Runtime.CompilerServices;
using CommonsLibraries;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("STDErr")]
    public class STDError : EventEmitter
    {
        public void Write(string question) {}
    }
}