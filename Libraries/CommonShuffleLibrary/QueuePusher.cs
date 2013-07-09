using CommonLibraries;
using Models;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using NodeLibraries.Redis;
namespace CommonShuffleLibrary
{
    public class QueuePusher : QueueItem
    {
        private RedisClient client1;

        public QueuePusher(string pusher)
        {
            var redis = Global.Require<Redis>("redis");
            Channel = pusher;
            client1 = redis.CreateClient(6379, Constants.RedisIP);
        }

        public void Message(string channel, string name, UserLogicModel user, string eventChannel, object content)
        {
            var message = new QueueMessage(name, user, eventChannel, content);
            var value = Json.Stringify(message, Help.Sanitize);
            if (CommonLibraries.Help.Verbose)
                ServerLogger.Log(channel + "RPush " + value, LogLevel.Information);
            client1.RPush(channel, value); //todo:maybe sanitize
        }
    }
}