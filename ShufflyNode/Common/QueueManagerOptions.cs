namespace ShufflyNode.Common
{
    public class QueueManagerOptions
    {
        private string[] pushers;
        public string[] Pushers { get { return pushers; } set { pushers = value; } }
        private QueueWatcher[] watchers;
        public QueueWatcher[] Watchers { get { return watchers; } set { watchers = value; } }

        public QueueManagerOptions(QueueWatcher[] watchers, string[] pushers)
        {
            Pushers = pushers;
            Watchers = watchers;
        }
    }
}