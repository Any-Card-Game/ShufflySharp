using System;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace RedisLibrary
{
    public class RedisClient : EventEmitter
    {
        public void Publish(string channel, object content) {}
        public void Subscribe(string channel) {}

        [ScriptName("rpush")]
        public void RPush(string channel, object value) { }

        [ScriptName("monitor")]
        public void Monitor( Action<string, object> action) { } 

        [ScriptName("blpop")]
        public void BLPop(object[] objectsAndTimeout, Action<string, object> action) { }
    }
}