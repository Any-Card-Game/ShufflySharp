using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models.ChatManagerModels;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using NodeLibraries.Redis;
namespace CommonShuffleLibrary
{
    public class PubSub
    {
        private bool pready;
        private RedisClient pubClient;
        private bool sready;
        private RedisClient subClient;
        private JsDictionary<string, Action<string>> subbed;

        public PubSub(Action<PubSub> ready)
        {
            subbed = new JsDictionary<string, Action<string>>();

            var redis = Global.Require<NodeLibraries.Redis.Redis>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(6379, Constants.RedisIP);
            pubClient = redis.CreateClient(6379, Constants.RedisIP);
            subClient.On("subscribe", (string channel, int count) => Logger.Log("subscribed: " + channel + " " + count,LogLevel.Information));
            subClient.On("unsubscribe", (string channel, int count) => Logger.Log("unsubscribed: " + channel + " " + count, LogLevel.Information));

            subClient.On("message",
                         (string channel, string message) => {
                             if (subbed[channel] != null)
                                 subbed[channel](message);
                         });
            subClient.On("ready",
                         () => {
                             sready = true;
                             if (sready && pready)
                                 ready(this);
                         });
            pubClient.On("ready",
                         () => {
                             pready = true;
                             if (sready && pready)
                                 ready(this);
                         });
        }

        public void Publish(string channel, string content)
        {
            pubClient.Publish(channel, content);
        }

        
        public void Subscribe (string channel, Action<string> callback)
        {
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}