using System;

namespace ShufflyNode.GameServer
{
    public class QueueManagerWatcher
    {
        private Action<string, User, string, string> callback;
        private string queueName;
        public string QueueName { get { return queueName; } set { queueName = value; } }
        public Action<string, User, string, string> Callback { get { return callback; } set { callback = value; } }


        public QueueManagerWatcher(string queue, Action<string, User, string, string> callback)
        {
            queueName = queue;
            this.callback = callback;
        }
    }
}