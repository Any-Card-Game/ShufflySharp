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

    public static class ServerLogger
    {
        private static PubSub pubsub;
        private static string ServerType;
        private static string ServerName;

        public static void InitLogger(string serverType, string serverName)
        {

            ServerName = serverName;
            ServerType = serverType;
            pubsub = new PubSub((ps) =>
                                {

                                });
        }

        public static void Log(string item, LogLevel level)
        {
            Logger.Log(item, level);
            pubsub.Publish(string.Format("PUBSUB.ServerLogger.{0}", ServerType), Json.Stringify(new ServerLogMessage(ServerType,ServerName,item,DateTime.Now)));
            
        }

    }
    public   class ServerLogListener
    {
        private   PubSub pubsub;
        private   string ServerType;

        public ServerLogListener(string serverType, Action<ServerLogMessage> callback)
        {

            ServerType = serverType;
            pubsub =
                new PubSub(
                    (ps) =>
                        ps.Subscribe(string.Format("PUBSUB.ServerLogger.{0}", ServerType),
                            (content) => callback(Json.Parse<ServerLogMessage>(content))));
        }

 
    }
    [Serializable]
    public class ServerLogMessage
    {
        public DateTime Now { get; set; }
        public string ServerType { get; set; }
        public string ServerName { get; set; }
        public string Content { get; set; }
        [ObjectLiteral]
        public ServerLogMessage(string serverType,string serverName, string content, DateTime now)
        {
            ServerType = serverType;
            ServerName = serverName;
            Content = content;
            Now = now;
        }
    }
}