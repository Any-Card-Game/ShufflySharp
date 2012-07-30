using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Effects")]
    public class CardGameEffect
    {
        public CardGameEffect()
        {
            Type = "";
        }

        [ScriptName("type")]
        [IntrinsicProperty]
        public string Type { get; set; }
    }
}