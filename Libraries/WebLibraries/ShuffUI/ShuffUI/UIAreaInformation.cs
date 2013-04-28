using System.Runtime.CompilerServices;
using jQueryApi;
namespace WebLibraries.ShuffUI.ShuffUI
{
    public class UIAreaInformation
    {
        [ScriptName("element")]
        public jQueryObject Element { get; set; }
        [ScriptName("inner")]
        public jQueryObject Inner { get; set; }

        public UIAreaInformation(jQueryObject element, jQueryObject inner)
        {
            Element = element;
            Inner = inner;
        }
    }
}