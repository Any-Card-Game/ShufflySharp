using System;
using System.Collections;
using CommonLibraries;
using Models;
using NodeJSLibrary;
using RedisLibrary;
namespace CommonShuffleLibrary
{
    public class QueueWatcher : QueueItem //todo generisize
    {
        private RedisClient client1;
        public Action<string, UserModel, string, object> Callback { get; set; }

        public QueueWatcher(string queue, Action<string, UserModel, string, object> callback)
        {
            Channel = queue;
            Callback = callback;

            var redis = Global.Require<Redis>("redis");
            ( (JsDictionary) (object) redis )["foo"] = 2;

            client1 = redis.CreateClient(6379, IPs.RedisIP);

            Cycle(queue);
        }

        public void Cycle(string channel)
        {
            client1.BLPop(new object[] {channel, 0},
                          (caller, dtj) => {
                              var data = (string[]) dtj;
                              if (dtj != null) {
                                  var dt = Json.ParseData<QueueMessage>(data[1]);
                                  Callback(dt.Name, dt.User, dt.EventChannel, dt.Content);
                              }
                              Cycle(channel);
                          });
        }
    }
    //http://www.youtube.com/watch?v=tOu-LTsk1WI*/
}