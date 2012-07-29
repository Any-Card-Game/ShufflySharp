using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace CommonLibraries
{
    public static class ExtensionMethods
    {

        [InlineCode("{script}")]
        public static dynamic me(this object script)
        {
            return script;
        }
        [InlineCode("eval({script})")]
        public static dynamic eval(this object script)
        {
            return null;
        }
    }
}
