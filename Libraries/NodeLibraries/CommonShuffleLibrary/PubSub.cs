using System;
using System.Collections.Generic;
using NodeJSLibrary;
using RedisLibrary;

namespace CommonShuffleLibraries
{
    public class PubSub
    {
        private JsDictionary<string, Action<object>> subbed = new JsDictionary<string, Action<object>>();
        private bool sready;
        private bool pready;
        private RedisClient subClient;
        private RedisClient pubClient;
        public PubSub(Action ready)
        {
            Redis redis = Global.Require<Redis>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(6379, IPs.RedisIP);
            pubClient = redis.CreateClient(6379, IPs.RedisIP);
            subClient.On("subscribe", (string channel, int count) => Console.Log("subscribed: " + channel + " " + count));
            subClient.On("unsubscribe", (string channel, int count) => Console.Log("unsubscribed: " + channel + " " + count));

            subClient.On("message", (string channel, object message) =>
                {
                    if (subbed.ContainsKey(channel))
                    {
                        subbed[channel].Invoke(message);
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

        public void Subscribe(string channel, Action<object> callback)
        {
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }

 }