using CommonLibraries;
using Models;
using NodeJSLibrary;
using RedisLibrary;
namespace CommonShuffleLibrary
{
    public class QueuePusher : QueueItem
    {
        private RedisClient client1;

        public QueuePusher(string pusher)
        {
            var redis = Global.Require<Redis>("redis");
            Channel = pusher;
            client1 = redis.CreateClient(6379, IPs.RedisIP);
        }

        public void Message(string channel, string name, UserModel user, string eventChannel, object content)
        {
            var message = new QueueMessage(name, user, eventChannel, content);
            var value = Json.Stringify(message, Help.Sanitize);
            client1.RPush(channel, value); //todo:maybe sanitize
        }
    }
    public class QueueMessage
    {
        public object Content;
        public string EventChannel;
        public string Name;
        public UserModel User;

        public QueueMessage(string name, UserModel user, string eventChannel, object content)
        {
            Name = name;
            User = user;
            EventChannel = eventChannel;
            Content = content;
        }
    }
}