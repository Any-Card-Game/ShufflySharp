using System.Runtime.CompilerServices;
namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class CodeMirrorLine
    {
        [IntrinsicProperty]
        [ScriptName("markerText")]
        public bool MarkerText { get; set; }
    }
}