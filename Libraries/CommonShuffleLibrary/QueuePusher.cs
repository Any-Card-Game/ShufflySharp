using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibrary;
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
            Redis redis = Global.Require<Redis>("redis");
            Channel = pusher;
            client1 = redis.CreateClient(6379, IPs.RedisIP);

        }

        public void Message<T>(string channel, string name, UserModel user, string eventChannel, T content)
        {
            var message = new QueueMessage<T>(name, user, eventChannel, content);
            var value = Json.Stringify(message, Help.Sanitize);
            client1.RPush(channel, value); //todo:maybe sanitize
        }

    } 

    public class QueueMessage <T>
    { 

        public string Name;
        public UserModel User;
        public string EventChannel;
        public T Content;
 

        public QueueMessage(string name, UserModel user, string eventChannel, T content)
        {
            this.Name = name;
            this.User = user;
            this.EventChannel = eventChannel;
            this.Content = content; 
        }
         
    }
}