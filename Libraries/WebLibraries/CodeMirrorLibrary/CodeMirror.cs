using System.Html;
using System.Runtime.CompilerServices;
namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("CodeMirror")]
    public class CodeMirror
    {
        public Element ScrollerElement
        {
            [ScriptName("getScrollerElement")] get { return null; }
        }

        public static CodeMirror FromTextArea(Element element, CodeMirrorOptions options)
        {
            return null;
        }

        public void Refresh() {}

        public void SetGutterMarker(int lineIndex,string gutterID, string style) { }

        public void SetValue(string data) {}

        public void ClearGutter(string gutterID) { }

        public void SetCursor(int lineNumber, int colNumber) {}

        public string GetValue()
        {
            return null;
        }

        public CodeEditorCursor GetCursor()
        {
            return null;
        }

        public CodeMirrorLine AddLineClass(CodeMirrorLine line, string where, string style)
        {
            return null;
        }

        public CodeMirrorLine AddLineClass(int lineIndex, string where, string style)
        {
            return null;
        }
        public CodeMirrorLine RemoveLineClass(CodeMirrorLine line, string where, string style)
        {
            return null;
        }

        public CodeMirrorLine RemoveLineClass(int lineIndex, string where, string style)
        {
            return null;
        }
        public void SetOption(string key, object value) {}

        public int LineCount()
        {
            return 0;
        }

        public CodeMirrorLine LineInfo(int lineIndex)
        {
            return null;
        }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class CodeMirrorLine
    {
        [IntrinsicProperty]
        [ScriptName("markerText")]
        public bool MarkerText { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class CodeEditorCursor
    {
        [IntrinsicProperty]
        [ScriptName("line")]
        public CodeMirrorLine Line { get; set; }
    }
}