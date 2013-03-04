using System;
using System.Runtime.CompilerServices;
namespace CommonLibraries
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("console")]
    public static class Console
    {
        public static void Log(object val) { }
        public static void Error(Exception val) { }
        public static void Log() {}
    }
}