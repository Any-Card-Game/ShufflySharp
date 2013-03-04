using System.Runtime.CompilerServices;
namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported]
    public class CodeEditorCursor
    {
        [IntrinsicProperty]
        [ScriptName("line")]
        public CodeMirrorLine Line { get; set; }
    }
}