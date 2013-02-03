using System.Runtime.CompilerServices;
using CommonsLibraries;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class STDOut : EventEmitter
    {
        public void Write(string question) {}
    }
}