using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("TableTextArea")]
    public class CardGameTextArea
    {
        [ScriptName("text")]
        [IntrinsicProperty]
        public string Text { get; set; }

        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }

        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }
    }
}