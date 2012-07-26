using System;
using System.Collections;
using System.Serialization;
using NodeJSLibrary;
using RedisLibrary;

namespace CommonShuffleLibraries
{
    public class QueueWatcher : QueueItem
    {
        private Action<string, User, string, object> callback;
        private RedisClient client1;
        public Action<string, User, string, object> Callback { get { return callback; } set { callback = value; } }


        public QueueWatcher(string queue, Action<string, User, string, object> callback)
        {
            Channel = queue;
            this.callback = callback;

            Redis redis = Global.Require<Redis>("redis");
            ((Dictionary) (object) redis)["foo"] = 2;

            client1 = redis.CreateClient(6379, IPs.RedisIP);

            Cycle(queue);
        }
        public void Cycle(string channel)
        {
            client1.BLPop(new object[] { channel, 0 }, delegate(string caller, object dtj)
                                                           {
                                                               string[] data = (string[]) dtj; 
                                                               if (dtj != null)
                                                               {
                                                                   QueueMessage dt = Json.ParseData<QueueMessage>(data[1]);
                                                                   Callback(dt.Name, dt.User, dt.EventChannel, dt.Content);
                                                               }
                                                               Cycle(channel);
                                                           });
        }
    }

    //http://www.youtube.com/watch?v=tOu-LTsk1WI*/
}