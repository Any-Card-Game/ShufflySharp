using System;
using CommonLibraries;
using Models;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using NodeLibraries.Redis;
namespace CommonShuffleLibrary
{
    public class QueueWatcher : QueueItem //todo generisize
    {
        private RedisClient client1;
        public Action<string, UserLogicModel, string, object> Callback { get; set; }

        public QueueWatcher(string queue, Action<string, UserLogicModel, string, object> callback)
        {
            Channel = queue;
            Callback = callback;

            var redis = Global.Require<Redis>("redis");

            client1 = redis.CreateClient(6379, Constants.RedisIP);

            Cycle(queue);
        }

        public void Cycle(string channel)
        {
            client1.BLPop(new object[] {channel, 10},
                          (caller, dtj) => {


                              var data = (string[])dtj; 

                              if (dtj != null)
                              {

                                  var dt = Json.ParseData<QueueMessage>(data[1]);
                                  ServerLogger.LogTransport("Channel: " + dt.EventChannel, dt.Content);

                                  Callback(dt.Name, dt.User, dt.EventChannel, dt.Content);
                              }
                              Cycle(channel);
                          });
        }
    }
    //http://www.youtube.com/watch?v=tOu-LTsk1WI*/
}