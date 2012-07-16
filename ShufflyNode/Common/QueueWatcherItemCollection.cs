 
using System.Collections.Generic; 

namespace ShufflyNode.Common
{
    class QueueItemCollection  
    {
        private readonly IEnumerable<QueueItem> queueItems;

        public QueueItemCollection(IEnumerable<QueueItem> queueItems)
        {
            this.queueItems = queueItems;
        }

        public QueueItem GetByChannel(string channel)
        {
            foreach (QueueItem queueWatcher in queueItems)
            {
                if(queueWatcher.Channel==channel || channel.IndexOf(queueWatcher.Channel.Replace("*",""))==0)
                {
                    return queueWatcher;
                }
            }
            return null;
        }
    }
}
/*
//generic for pushers and watchers
var queueItemCollection = function (queueItems) {

    if (!(queueItems instanceof Array)) {
        this.queueItems = queueItems ? [queueItems] : [];
    } else {
        this.queueItems = queueItems;
    }


    this.getByChannel = function (channel) {
        for (var i = 0; i < this.queueItems.length; i++) { 
            if (this.queueItems[i].channel == channel || channel.indexOf(this.queueItems[i].channel.replace('*', '')) == 0) {
                return this.queueItems[i];
            }
        }

    };

};

module.exports = queueItemCollection;*/