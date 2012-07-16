using System.Runtime.CompilerServices;
using NodeJS;
using Redis;

namespace ShufflyNode.Common
{
    public class QueuePusher : QueueItem
    {
        private RedisClient client1;

        public QueuePusher(string pusher)
        {
            Redis.Redis redis = Node.Require<Redis.Redis>("redis");
            Channel = pusher;
            client1 = redis.CreateClient(6379, IPs.RedisIP);

        }

        public void Message(string channel, string name, User user, string eventChannel, string content)
        {
            client1.RPush(channel, JSON.Stringify(new QueueMessage(name, user, eventChannel, content))); //todo:maybe sanitize
        }
    }

    public class QueueMessage
    {
        public string name;
        public User user;
        public string eventChannel;
        public string content;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        public User User
        {
            get { return user; }
            set { user = value; }
        }

        public string EventChannel
        {
            get { return eventChannel; }
            set { eventChannel = value; }
        }

        public string Content
        {
            get { return content; }
            set { content = value; }
        }


        public QueueMessage(string name, User user, string eventChannel, string content)
        {
            this.Name = name;
            this.User = user;
            this.EventChannel = eventChannel;
            this.Content = content;
        }
    }
}