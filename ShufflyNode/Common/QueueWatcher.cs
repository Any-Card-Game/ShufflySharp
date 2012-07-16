using System;
using NodeJS;
using Redis;

namespace ShufflyNode.Common
{
    public class QueueWatcher : QueueItem
    {
        private Action<string, User, string, string> callback;
        private RedisClient client1;
        public Action<string, User, string, string> Callback { get { return callback; } set { callback = value; } }


        public QueueWatcher(string queue, Action<string, User, string, string> callback)
        {
            Channel = queue;
            this.callback = callback;

            Redis.Redis redis = Node.Require<Redis.Redis>("redis");

            client1 = redis.CreateClient(6379, IPs.RedisIP);

            Cycle(queue);
        }
        public void Cycle(string channel)
        {
            client1.BLPop(new object[] { channel, 0 }, delegate(string caller, string data)
                                                           {
                                                               if (data != null)
                                                               {
                                                                   QueueMessage dt = JSON.Parse<QueueMessage>(data);
                                                                   Callback(dt.Name, dt.User, dt.EventChannel, dt.Content);
                                                               }
                                                               Cycle(channel);
                                                           });
        }
    }

    //http://www.youtube.com/watch?v=tOu-LTsk1WI*/
}