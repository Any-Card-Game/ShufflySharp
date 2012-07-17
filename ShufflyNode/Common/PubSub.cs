using System;
using System.Collections.Generic;
using NodeJS;
using Redis;

namespace ShufflyNode.Common
{
    public class PubSub
    {
        private Dictionary<string, Action<object>> subbed = new Dictionary<string, Action<object>>();
        private bool sready;
        private bool pready;
        private RedisClient subClient;
        private RedisClient pubClient;
        public PubSub(Action ready)
        {
            Redis.Redis redis = Global.Require<Redis.Redis>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(6379, IPs.RedisIP);
            pubClient = redis.CreateClient(6379, IPs.RedisIP);
            subClient.On("subscribe", delegate(string channel, int count) { Global.Console.Log("subscribed: " + channel + " " + count); });
            subClient.On("unsubscribe", delegate(string channel, int count) { Global.Console.Log("unsubscribed: " + channel + " " + count); });

            subClient.On("message", delegate(string channel, object message)
                                        {
                                            if (subbed.ContainsKey(channel))
                                            {
                                                subbed[channel].Invoke(message);
                                            }
                                        });
            subClient.On("ready", delegate
                                      {
                                          sready = true;
                                          if (sready && pready)
                                          {
                                              ready();
                                          }
                                      });
            pubClient.On("ready", delegate
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