using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported]
    
    public static class Global
    {
        [IntrinsicProperty]
        [ScriptAlias("process")]
        public static Process Process { get; set; }
        [ScriptAlias("global")]
        public static dynamic Scope { get; set; }

        [ScriptAlias("require")]
        public static TModule Require<TModule>(string name)
        {
            return default(TModule);
        }

        [ScriptAlias("require")]
        public static void Require(string name) {}

        [ScriptAlias("setInterval")]
        public static void SetInterval(Action pollGateways, int poll) {}

        [ScriptAlias("setTimeout")]
        public static void SetTimeout(Action pollGateways, int poll) {}
    }
}