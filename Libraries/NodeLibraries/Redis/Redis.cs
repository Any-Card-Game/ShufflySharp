using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.Redis
{
    [Imported]
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