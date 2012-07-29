using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
using NodeJSLibrary;
using RedisLibrary;

namespace CommonShuffleLibrary
{
    public class PubSub
    {
        private bool pready;
        private RedisClient pubClient;
        private bool sready;
        private RedisClient subClient;
        private dynamic subbed;

        public PubSub(Action ready)
        {
            subbed = new object();
            var someSubbed = subbed;

            var redis = Global.Require<Redis>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(6379, IPs.RedisIP);
            pubClient = redis.CreateClient(6379, IPs.RedisIP);
            subClient.On("subscribe", (string channel, int count) => Console.Log("subscribed: " + channel + " " + count));
            subClient.On("unsubscribe", (string channel, int count) => Console.Log("unsubscribed: " + channel + " " + count));

            subClient.On("message", (string channel, object message) =>
                {
                    if (someSubbed[channel] != null)
                    {
                        someSubbed[channel](message);
                    }
                });
            subClient.On("ready", () =>
                {
                    sready = true;
                    if (sready && pready)
                    {
                        ready();
                    }
                });
            pubClient.On("ready", () =>
                {
                    pready = true;
                    if (sready && pready)
                    {
                        ready();
                    }
                });
        }


        public void Publish(string channel, string content)
        {
            pubClient.Publish(channel, content);
        }

        [IgnoreGenericArguments]
        public void Subscribe<T>(string channel, Action<T> callback)
        {
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}