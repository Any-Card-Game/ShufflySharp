using System;
using System.Runtime.CompilerServices;
using CommonsLibraries;
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
    public class RedisClient : EventEmitter
    {
        public void Publish(string channel, object content) {}
        public void Subscribe(string channel) {}

        [ScriptName("rpush")]
        public void RPush(string channel, object value) {}

        [ScriptName("blpop")]
        public void BLPop(object[] objectsAndTimeout, Action<string, object> action) {}
    }
}