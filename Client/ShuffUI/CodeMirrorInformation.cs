using System.Html;
using System.Runtime.CompilerServices;
using CodeMirrorLibrary;

namespace Client.ShuffUI
{
    public class CodeMirrorInformation 
    {
        public CodeMirrorInformation codeElement;

        [IntrinsicProperty]
        public CodeMirror editor { get; set; }

        [IntrinsicProperty]
        public TextAreaElement element { get; set; }

        [IntrinsicProperty]
        public CodeMirrorInformationData Data { get; set; }
    }
    public class CodeMirrorInformationData
    {
    }
}