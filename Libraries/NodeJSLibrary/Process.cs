using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonsLibraries;

namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("process")] 
    public  class Process : EventEmitter
    {

    }
}