using System.Collections;

namespace CommonShuffleLibraries
{
    public class Consumer
    {
        /*public QueueMessage(Dictionary dict) : base((dict ?? (Dictionary)new object()))
         {
             
         }*/
        public Consumer(Dictionary obj)
        {
            Dictionary tf = ((Dictionary)(object)this);
            foreach (string v in obj.Keys)
            {
                tf[v] = obj[v];
            }
        }
    }
}