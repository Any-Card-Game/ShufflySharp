using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models;
namespace CommonShuffleLibrary
{
    public class QueueManager
    {
        public string Name;
        public Dictionary<string, Action<UserModel, object>> channels;
        public List<QueuePusher> qp;
        private QueueItemCollection qpCollection;
        public List<QueueWatcher> qw;
        private QueueItemCollection qwCollection;

        public QueueManager(string name, QueueManagerOptions options)
        {
            Name = name;
            channels = new Dictionary<string, Action<UserModel, object>>();
            qw = new List<QueueWatcher>();
            qp = new List<QueuePusher>();
            foreach (var queueWatcher in options.Watchers) {
                if (queueWatcher.Callback == null)
                    queueWatcher.Callback = messageReceived;
                qw.Add(queueWatcher);
            }
            qw.AddRange(options.Watchers);
            foreach (var pusher in options.Pushers) {
                qp.Add(new QueuePusher(pusher));
            }

            qwCollection = new QueueItemCollection(qw);
            qpCollection = new QueueItemCollection(qp);
        }

        [IgnoreGenericArguments]
        public void AddChannel(string channel, Action<UserModel, object> callback)
        {
            channels[channel] = callback;
        }

        private void messageReceived(string name, UserModel user, string eventChannel, object content)
        {
            user.Gateway = name;

            if (channels[eventChannel] != null)
                channels[eventChannel](user, content);
        }

        public void SendMessage(UserModel user, string channel, string eventChannel,  object content)
        {
            if (qpCollection.GetByChannel(channel) == null) {
                Console.Log(channel + " No Existy");
                return;
            }

            var pusher = ( (QueuePusher) qpCollection.GetByChannel(channel) );
           // Console.Log(string.Format("- Channel: {0}  Name: {1}  User: {2}  EventChannel: {3}  Content: {4}", channel, Name, user , eventChannel, content));
            pusher.Message(channel, Name, user, eventChannel, content);
        }
    }
}