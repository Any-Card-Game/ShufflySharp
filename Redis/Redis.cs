// Class1.cs
//

using System;
using System.Html;
using System.Runtime.CompilerServices;
using NodeJS;

namespace Redis
{

    public class Redis : NodeModule
    {
        [ScriptName("debug_mode")]
          public bool DebugMode;

        public RedisClient CreateClient(int port, string ip)
        {
            return null;
        }
    }

    public class RedisClient:EventEmitter
    {
        [ScriptName("publish")]

        public void Publish(string channel, string content)
        {
            
        }
        [ScriptName("subscribe")]

        public void Subscribe(string channel)
        {
        }

        [ScriptName("rpush")]
        public void RPush(string channel, string value)
        {
        }

        [ScriptName("blpop")]
        public void BLPop(object[] objects, Action<string, string> action)
        {
            
        }
    }
}
