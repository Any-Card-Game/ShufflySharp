using System; 
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using NodeJSLibrary;

namespace CommonShuffleLibraries
{
    public class QueueManager
    {
        public string Name;
        public JsDictionary<string, Action<User, object>> channels;
        public List<QueueWatcher> qw;
        public List<QueuePusher> qp;
        
        //todo fix T
        [IgnoreGenericArguments] 
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
            channels = new JsDictionary<string, Action<User, object>>();
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

            qwCollection = new QueueItemCollection(qw);
            qpCollection = new QueueItemCollection(qp);
        }

        private QueueItemCollection qwCollection;
        private QueueItemCollection qpCollection;

        public void SendMessage(User user, string channel, string eventChannel, object content)
        {
            if (this.qpCollection.GetByChannel(channel) == null)
            {
                Console.Log(channel + " No Existy");
                return;
            }

            var pusher = ((QueuePusher) this.qpCollection.GetByChannel(channel));

            pusher.Message(channel, this.Name, user, eventChannel, content);
        }
    }
}