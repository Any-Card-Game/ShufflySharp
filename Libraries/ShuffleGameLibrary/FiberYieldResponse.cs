using System.Runtime.CompilerServices;
namespace global
{
    public class FiberYieldResponse
    {
        [ScriptName("variableLookup")]
        [IntrinsicProperty]
        public string VariableLookup { get; set; }
        [ScriptName("type")]
        [IntrinsicProperty]
        public FiberYieldResponseType Type { get; set; }
        [ScriptName("contents")]
        [IntrinsicProperty]
        public string Contents { get; set; }
        [ScriptName("question")]
        [IntrinsicProperty]
        public CardGameQuestion Question { get; set; }
        [ScriptName("lineNumber")]
        [IntrinsicProperty]
        public int LineNumber { get; set; }
        [ScriptName("value")]
        [IntrinsicProperty]
        public string Value { get; set; }

        public FiberYieldResponse(FiberYieldResponseType type, CardGameQuestion question) //answerQuestion
        {
            Type = type;
            Question = question;
        }

        public FiberYieldResponse(FiberYieldResponseType type, string contents) //log
        {
            Type = type;
            Contents = contents;
        }

        public FiberYieldResponse(FiberYieldResponseType type) //gameOver
        {
            Type = type;
        }

        public FiberYieldResponse(FiberYieldResponseType type, int lineNumber, string value) //break,variableLookup
        {
            Type = type;
            LineNumber = lineNumber;
            Value = value;
        }
    }
}