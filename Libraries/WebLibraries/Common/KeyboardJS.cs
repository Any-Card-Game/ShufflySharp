using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace WebLibraries.Common
{
    [Imported]
    public class KeyboardJS
    {
        [IntrinsicProperty]
        public KeyboardJSBind Bind { get; set; }

        [InlineCode("KeyboardJS")]
        public static KeyboardJS Instance()
        {
            return null;
        }
    }
    public delegate void KeyboardJSBindKey(string key, Action down, Action up);
    [Imported]
    public class KeyboardJSBind
    {
        [IntrinsicProperty]
        public KeyboardJSBindKey Key { get; set; }
    }
}
