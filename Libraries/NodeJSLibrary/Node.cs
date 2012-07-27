using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{ 
    [IgnoreNamespace]
    [Imported(IsRealType = true)] 
    [GlobalMethods()]
    [IgnoreGenericArguments]
    public static class Global
    {
        [IgnoreGenericArguments]
        [ScriptAlias("require")]
        public static TModule Require<TModule>(string name) where TModule : NodeModule
        {
            return null;
        }
        [ScriptAlias("setInterval")] 

        public static void SetInterval(Action pollGateways, int poll)
        {
        }
        [ScriptAlias("setTimeout")] 

        public static void SetTimeout(Action pollGateways, int poll)
        {
        } 
    }

    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("process")] 
    public  class Process : EventEmitter
    {

    }
}
