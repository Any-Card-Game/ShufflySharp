using System;
using System.Runtime.CompilerServices;

namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Record]
    public sealed class CodeMirrorOptions
    {
        [ScriptName("lineNumbers")]
        [IntrinsicProperty]
        public bool LineNumbers { get; set; }
        [ScriptName("lineWrapping")]
        [IntrinsicProperty]
        public bool LineWrapping { get; set; }
        [ScriptName("matchBrackets")]
        [IntrinsicProperty]
        public bool MatchBrackets { get; set; }
        [ScriptName("onGutterClick")]
        [IntrinsicProperty]
        public Action<dynamic,int> OnGutterClick { get; set; }
        [ScriptName("onCursorActivity")]
        [IntrinsicProperty]
        public Action<dynamic> OnCursorActivity { get; set; }
        [ScriptName("onFocus")]
        [IntrinsicProperty]
        public Action<dynamic> OnFocus { get; set; }
        [ScriptName("onBlur")]
        [IntrinsicProperty]
        public Action<dynamic> OnBlur { get; set; }
    }
}