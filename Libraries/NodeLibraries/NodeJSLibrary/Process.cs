using System.Runtime.CompilerServices;
using CommonsLibraries;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("process")]
    public class Process : EventEmitter
    {
        [ScriptName("stdin")]
        [IntrinsicProperty]
        public STDIn STDIn { get; set; }
        [ScriptName("stdout")]
        [IntrinsicProperty]
        public STDOut STDOut { get; set; }
        [ScriptName("stderr")]
        [IntrinsicProperty]
        public STDError STDError { get; set; }
        public void Exit() {}
    }
}