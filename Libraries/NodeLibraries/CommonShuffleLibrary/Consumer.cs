using System.Collections;

namespace CommonShuffleLibrary
{
    public class Consumer
    {
        /*public QueueMessage(Dictionary dict) : base((dict ?? (Dictionary)new object()))
         {
             
         }*/
        public Consumer(JsDictionary obj)
        {
            JsDictionary tf = ((JsDictionary)(object)this);
            foreach (string v in obj.Keys)
            {
                tf[v] = obj[v];
            }
        }
    }
}