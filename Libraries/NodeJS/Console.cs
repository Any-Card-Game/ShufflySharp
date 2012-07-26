using System.Runtime.CompilerServices;

namespace NodeJSLibrary
{
    [ScriptName("console")]
    public class Console
    {
        [ScriptName("log")]
        public void Log(object val)
        {
        }
        [ScriptName("log")]
        public void Log()
        {
        }
    }

}