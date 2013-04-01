using System.Html;
using System.Runtime.CompilerServices;
namespace WebLibraries.Common.ShuffUI
{
    public class CodeMirrorInformation
    {
        public CodeMirrorInformation codeElement;
        [IntrinsicProperty]
        public CodeMirror.CodeMirror editor { get; set; }
        [IntrinsicProperty]
        public TextAreaElement element { get; set; }
        [IntrinsicProperty]
        public CodeMirrorInformationData Data { get; set; }
    }
}