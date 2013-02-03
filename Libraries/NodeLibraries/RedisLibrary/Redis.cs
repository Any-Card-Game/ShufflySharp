using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace RedisLibrary
{
    [Imported(IsRealType = true)]
    [IgnoreNamespace]
    public class Redis : NodeModule
    {
        [ScriptName("debug_mode")] public bool DebugMode;

        public RedisClient CreateClient(int port, string ip)
        {
            return null;
        }
    }
}