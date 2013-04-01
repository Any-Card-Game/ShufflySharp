using System.Runtime.CompilerServices;
namespace WebLibraries.CodeMirror
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