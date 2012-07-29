using System.Runtime.CompilerServices;

namespace global
{
    public class Card
    {
        public int Number { get; set; }
        public int Type { get; set; }

        public Card(int  number, int type)
        {
            this.Number = number;
            this.Type = type;
        }

        public string Name
        {
            [ScriptName("getName")]
            get { return this.Number + " " + this.Type; }
        }
    }
}