using System;
using NodeJS;

namespace ShufflyNode.GameServer
{
    public class PubSub
    {
        public PubSub(Action started)
        {
            Redis.Redis redis = Node.Require<Redis.Redis>("redis");
        }

        public void Publish(string pubsubGatewayservers, string s)
        {
        }

        public void Subscribe(string pubsubGatewayserversPing, Action<object> action)
        {
        }
    }
}