namespace CommonShuffleLibrary
{
    public class QueueManagerOptions
    {
        public string[] Pushers;
        public QueueWatcher[] Watchers;

        public QueueManagerOptions(QueueWatcher[] watchers, string[] pushers)
        {
            Pushers = pushers;
            Watchers = watchers;
        }
    }
}