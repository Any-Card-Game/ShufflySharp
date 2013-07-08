using System.Runtime.CompilerServices;
namespace global
{
    public class FiberYieldResponse
    {
        [IntrinsicProperty]
        public string VariableLookup { get; set; }
        [IntrinsicProperty]
        public FiberYieldResponseType Type { get; set; }
        [IntrinsicProperty]
        public string Contents { get; set; }
        [IntrinsicProperty]
        public CardGameQuestion Question { get; set; }
        [IntrinsicProperty]
        public int LineNumber { get; set; }
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