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
            var tf = ( (JsDictionary) (object) this );
            foreach (var v in obj.Keys) {
                tf[v] = obj[v];
            }
        }
    }
}