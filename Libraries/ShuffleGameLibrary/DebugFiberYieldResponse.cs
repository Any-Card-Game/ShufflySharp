using System.Runtime.CompilerServices;

namespace global
{
    public   class DebugFiberYieldResponse
    {
        [IntrinsicProperty]
        public string VariableLookup { get; set; }
        [IntrinsicProperty]
        public DebugFiberYieldResponseType Type { get; set; }
        [IntrinsicProperty]
        public string Contents { get; set; }
        [IntrinsicProperty]
        public CardGameQuestion Question { get; set; }
        [IntrinsicProperty]
        public int LineNumber { get; set; }
        [IntrinsicProperty]
        public string Value { get; set; }

        public DebugFiberYieldResponse(DebugFiberYieldResponseType type, CardGameQuestion question) //answerQuestion
        {
            Type = type;
            Question = question;
        }

        public DebugFiberYieldResponse(DebugFiberYieldResponseType type, string contents) //log
        {
            Type = type;
            Contents = contents;
        }

        public DebugFiberYieldResponse(DebugFiberYieldResponseType type) //gameOver
        {
            Type = type;
        }

        public DebugFiberYieldResponse(DebugFiberYieldResponseType type, int lineNumber, string value) //break,variableLookup
        {
            Type = type;
            LineNumber = lineNumber;
            Value = value;
        }
    }
}