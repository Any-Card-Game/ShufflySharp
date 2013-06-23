using System;
using System.Runtime.CompilerServices;
namespace Client.Scope
{

    [Serializable]
    public class FloatingWindowScope
    {
        [ScriptName("$parent")]
        public FloatingWindowBaseScope Parent { get; set; }

        public bool Visible { get; set; }

        public string Width { get; set; }
        public string Height { get; set; }
        public string Left { get; set; }
        public string Top { get; set; }
        public Size SizeStyle { get; set; }
        public Size LastSizeStyle { get; set; }
        public FloatingWindowPosition PositionStyles { get; set; }
        public FloatingWindowPosition LastPositionStyles { get; set; }
        public string Title { get; set; }

        [ScriptName("onclose")]
        public Action OnClose { get; set; }
        public Action Close { get; set; }
        public Action Minimize { get; set; }
        public Action Maximize { get; set; }
        public Action Restore { get; set; }
        public bool IsMaximized { get; set; }
    }


    [Serializable]
    public class FloatingWindowPosition 
    {
        public string Display { get; set; }

        public string Left { get; set; }
        public string Top { get; set; }

        public string MarginLeft { get; set; }
        public string MarginTop { get; set; }

    } 
    [Serializable]
    public class Size
    {
        public string Width { get; set; }
        public string Height { get; set; }

    }
}