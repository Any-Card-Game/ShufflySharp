using System.Runtime.CompilerServices;

namespace global
{
    [Record]
    public sealed class CardGameEffectHighlightOptions
    {
        [ScriptName("radius")]
        [IntrinsicProperty]
        public double Radius { get; set; }

        [ScriptName("color")]
        [IntrinsicProperty]
        public string Color { get; set; }

        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }

        [ScriptName("offsetX")]
        [IntrinsicProperty]
        public double OffsetX { get; set; }

        [ScriptName("offsetY")]
        [IntrinsicProperty]
        public double OffsetY { get; set; }
    }
}