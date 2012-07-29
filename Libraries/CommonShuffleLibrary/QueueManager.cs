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
        public dynamic channels; //necessary evil for maintaining sanity//::dynamic okay
        public List<QueuePusher> qp;
        private QueueItemCollection qpCollection;
        public List<QueueWatcher> qw;
        private QueueItemCollection qwCollection;

        public QueueManager(string name, QueueManagerOptions options)
        {
            Name = name;
            channels = new object();
            qw = new List<QueueWatcher>();
            qp = new List<QueuePusher>();
            foreach (var queueWatcher in options.Watchers)
            {
                if (queueWatcher.Callback == null)
                {
                    queueWatcher.Callback = messageReceived;
                }
                qw.Add(queueWatcher);
            }
            qw.AddRange(options.Watchers);
            foreach (var pusher in options.Pushers)
            {
                qp.Add(new QueuePusher(pusher));
            }

            qwCollection = new QueueItemCollection(qw);
            qpCollection = new QueueItemCollection(qp);
        }


        //todo fix T 
        [IgnoreGenericArguments]
        public void AddChannel<T>(string channel, Action<UserModel, T> callback)
        {
            channels[channel] = callback;
        }

        private void messageReceived<T>(string name, UserModel user, string eventChannel, T content)
        {
            user.Gateway = name;

            if (channels[eventChannel] != null)
            {
                channels[eventChannel](user, content);
            }
        }


        public void SendMessage<T>(UserModel user, string channel, string eventChannel, T content)
        {
            if (qpCollection.GetByChannel(channel) == null)
            {
                Console.Log(channel + " No Existy");
                return;
            }

            var pusher = ((QueuePusher) qpCollection.GetByChannel(channel));

            pusher.Message(channel, Name, user, eventChannel, content);
        }
    }
}