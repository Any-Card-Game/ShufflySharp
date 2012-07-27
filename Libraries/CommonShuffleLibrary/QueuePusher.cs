using System.Serialization;
using NodeJSLibrary;
using RedisLibrary;

namespace CommonShuffleLibraries
{
    public class QueuePusher : QueueItem
    {
        private RedisClient client1;

        public QueuePusher(string pusher)
        {
            Redis redis = Global.Require<Redis>("redis");
            Channel = pusher;
            client1 = redis.CreateClient(6379, IPs.RedisIP);

        }

        public void Message(string channel, string name, User user, string eventChannel, object content)
        {
            var message = new QueueMessage(name, user, eventChannel, content);
            var value = Json.Stringify(message, Help.Sanitize);
            client1.RPush(channel, value); //todo:maybe sanitize
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