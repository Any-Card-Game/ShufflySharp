using System;
using System.Collections;
using System.Serialization;
using NodeJSLibrary;
using RedisLibrary;

namespace CommonShuffleLibraries
{
    public class QueueWatcher : QueueItem
    {
        private RedisClient client1;
        public Action<string, User, string, object> Callback { get; set; }


        public QueueWatcher(string queue, Action<string, User, string, object> callback)
        {
            Channel = queue;
            Callback = callback;

            Redis redis = Global.Require<Redis>("redis");
            ((JsDictionary)(object)redis)["foo"] = 2;

            client1 = redis.CreateClient(6379, IPs.RedisIP);

            Cycle(queue);
        }
        public void Cycle(string channel)
        {
            client1.BLPop(new object[] { channel, 0 }, (caller, dtj) =>
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