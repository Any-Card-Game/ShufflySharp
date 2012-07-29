using System.Runtime.CompilerServices;

namespace CommonLibraries
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("console")]
    public static class Console
    {
        [ScriptName("log")]
        public static void Log(object val)
        {
        }

        [ScriptName("log")]
        public static void Log()
        {
        }
    }
}