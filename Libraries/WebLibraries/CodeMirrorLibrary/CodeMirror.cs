
using System.Html;
using System.Runtime.CompilerServices; 
namespace CodeMirrorLibrary
{
    [IgnoreNamespace] 
    [Imported(IsRealType = true)]
    [ScriptName("CodeMirror")] 

    public class CodeMirror 
    {
        public CodeMirror()
        {

        }

        [ScriptName("fromTextArea")]
        public static CodeMirror FromTextArea(Element element,CodeMirrorOptions options)
        {
            return null;

        }
        [ScriptName("refresh")]
        public void Refresh()
        {
        }

        [ScriptName("setMarker")]
        public void SetMarker(int lineIndex, string style)
        {
        }

        [ScriptName("setValue")]
        public void SetValue(object data)
        {
            
        }
        [ScriptName("clearMarker")]
        public void ClearMarker(int lineNumber)
        {
            
        }

        [ScriptName("setCursor")]
        public void SetCursor(int lineNumber, int colNumber)
        {
        }

        [ScriptName("getValue")]
        public string GetValue()
        {
            return null;
        }
    }
}
