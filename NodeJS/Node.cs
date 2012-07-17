using System;
using System.Runtime.CompilerServices;

namespace NodeJS
{
    [GlobalMethods]
    [IgnoreNamespace]
    [ScriptName("global")]
    public static class Global
    {

        public static TModule Require<TModule>(string name) where TModule : NodeModule
        {
            return null;
        }

        public static void SetInterval(Action pollGateways, int poll)
        {
        }

        public static void SetTimeout(Action pollGateways, int poll)
        {
        }

        [ScriptName("process")]
        public static Process Process;

        [ScriptName("console")] 
        public static Console Console;
    }

    public class Process : EventEmitter
    {

    }
}
