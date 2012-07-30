using System.Runtime.CompilerServices;

namespace global
{
    [Record]
    public sealed class CardGameEffectRotateOptions
    {
        [ScriptName("degrees")]
        [IntrinsicProperty]
        public double Degrees { get; set; }
    }
}