using System;
using System.Runtime.CompilerServices;
namespace CommonLibraries
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("console")]
    public static class GoodConsole
    {
        public static void Log(object val) { }
        public static void Error(Exception val) { }
        public static void Log() {}
        [InlineCode("console.log({message})")]
        public static void WriteLine(string message){}

        [InlineCode("console.time({message})")]
        public static void Time(string message){}
        [InlineCode("console.timeEnd({message})")]
        public static void TimeEnd(string message){}

    }
}