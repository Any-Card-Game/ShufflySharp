using System;
using System.Collections.Generic;
using NodeJS;

namespace ShufflyNode.Common
{
    public class QueueManager
    {
        public string Name;
        public Dictionary<string, Action<User, object>> channels;
        public List<QueueWatcher> qw;
        public List<QueuePusher> qp;

        public void AddChannel<T>(string channel, Action<User, object> callback)
        {
            channels[channel] = callback;
        }
        private void messageReceived(string name, User user, string eventChannel, object content)
        {
            user.Gateway = name;

            if (channels.ContainsKey(eventChannel))
            {
                channels[eventChannel].Invoke(user, content);
            }
        }

        public QueueManager(string name, QueueManagerOptions options)
        {
            Name = name;
            channels = new Dictionary<string, Action<User, object>>();
            qw = new List<QueueWatcher>();
            qp = new List<QueuePusher>();
            foreach (QueueWatcher queueWatcher in options.Watchers)
            {
                if (queueWatcher.Callback == null)
                {
                    queueWatcher.Callback = messageReceived;
                }
                qw.Add(queueWatcher);
            }
            qw.AddRange(options.Watchers);
            foreach (string pusher in options.Pushers)
            {
                qp.Add(new QueuePusher(pusher));
            }

            qwCollection = new QueueItemCollection((IEnumerable<QueueItem>)((IEnumerable<QueueWatcher>)qw));
            qpCollection = new QueueItemCollection((IEnumerable<QueueItem>)((IEnumerable<QueuePusher>)qp));
        }

        private QueueItemCollection qwCollection;
        private QueueItemCollection qpCollection;

        public void SendMessage(User user, string channel, string eventChannel, object content)
        {
            if (this.qpCollection.GetByChannel(channel) == null)
            {
                Global.Console.Log(channel + " No Existy");
                return;
            }


            ((QueuePusher)this.qpCollection.GetByChannel(channel)).Message(channel, this.Name, user, eventChannel, content);
        }
    }
}