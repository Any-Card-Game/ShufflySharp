using System;
using System.Collections;
using System.Runtime.CompilerServices;
using System.Serialization;
using NodeJS;
using Redis;

namespace ShufflyNode.Common
{
    public class QueuePusher : QueueItem
    {
        private RedisClient client1;

        public QueuePusher(string pusher)
        {
            Redis.Redis redis = Global.Require<Redis.Redis>("redis");
            Channel = pusher;
            client1 = redis.CreateClient(6379, IPs.RedisIP);

        }

        public void Message(string channel, string name, User user, string eventChannel, object content)
        {
            client1.RPush(channel, Json.Stringify(new QueueMessage(name, user, eventChannel, content), Help.Sanitize)); //todo:maybe sanitize
        }

    }

    public class QueueMessage 
    { 

        public string Name;
        public User User;
        public string EventChannel;
        public object Content;
 

        public QueueMessage(string name, User user, string eventChannel, object content)
        {
            this.Name = name;
            this.User = user;
            this.EventChannel = eventChannel;
            this.Content = content; 
        }
         
    }
}