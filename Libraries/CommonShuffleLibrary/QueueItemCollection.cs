using System.Collections.Generic;

namespace CommonShuffleLibrary
{
    public class QueueItemCollection
    {
        private readonly IEnumerable<QueueItem> queueItems;

        public QueueItemCollection(IEnumerable<QueueItem> queueItems)
        {
            this.queueItems = queueItems;
        }

        public QueueItem GetByChannel(string channel)
        {
            foreach (var queueWatcher in queueItems)
            {
                if (queueWatcher.Channel == channel || channel.IndexOf(queueWatcher.Channel.Replace("*", "")) == 0)
                {
                    return queueWatcher;
                }
            }
            return null;
        }
    }
}