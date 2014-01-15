using System;
using System.Runtime.CompilerServices;

namespace Client.Scope.Directive
{
    [Serializable]
    public class FloatingWindowPosition
    {
        public string Display { get; set; }

        public string Left { get; set; }
        public string Top { get; set; }

        public string MarginLeft { get; set; }
        public string MarginTop { get; set; }

        [ScriptName("zIndex")]
        public int ZIndex { get; set; }
    }
}