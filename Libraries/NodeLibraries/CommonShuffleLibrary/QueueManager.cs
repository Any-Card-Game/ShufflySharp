using System; 
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonShuffleLibrary;
using NodeJSLibrary;

namespace CommonShuffleLibrary
{

    public   class QueueManager
    {
        public string Name;
        public dynamic channels;//necessary evil for maintaining sanity
        public List<QueueWatcher> qw;
        public List<QueuePusher> qp;

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

         
        //todo fix T 
        [IgnoreGenericArguments] 
        public void AddChannel<T>(string channel, Action<User, T> callback)
        {
            channels[channel] = callback;
        }

        private void messageReceived(string name, User user, string eventChannel, object content)
        {
            user.Gateway = name;

            if (channels[eventChannel]!=null)
            {
                channels[eventChannel](user, content);
            }
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
