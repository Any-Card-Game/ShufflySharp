using System.Runtime.CompilerServices;

namespace global
{
    [Record]
    public sealed class YieldObject
    {
        [ScriptName("type")]
        [IntrinsicProperty]
        public string Type { get; set; }
        [ScriptName("lineNumber")]
        [IntrinsicProperty]
        public int LineNumber { get; set; }
        [ScriptName("value")]
        [IntrinsicProperty]
        public string Value { get; set; }
    }
}