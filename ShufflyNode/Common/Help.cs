using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using ShufflyGame;

namespace ShufflyNode.Common
{
    public static class Help
    {
        public static object Sanitize(string name, object value)
        {
            if (value.GetType() == typeof(Function)) return null;
            if (name.IndexOf('_') != 0 && name.ToLowerCase() != "socket" && name.ToLowerCase() != "fiber" && name.ToLowerCase() != "debuggingsocket") return value;
            return null;
        }

       
    }
}
