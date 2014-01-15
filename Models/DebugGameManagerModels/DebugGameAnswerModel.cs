using System;
using System.Runtime.CompilerServices;

namespace Models.DebugGameManagerModels
{
    [Serializable]
    public class DebugGameAnswerModel
    {
        public int LineNumber { get; set; }
        public int Value { get; set; }
        private DebugGameAnswerModel() { }

        [ObjectLiteral]
        public DebugGameAnswerModel(int lineNumber, int value)
        {
            LineNumber = lineNumber;
            Value = value;
        }
    }


    [Serializable]
    public class DebugGameLogModel
    {
        public string Value { get; set; }
        private DebugGameLogModel() { }

        [ObjectLiteral]
        public DebugGameLogModel(string value)
        {
            Value = value;
        }
    }
    [Serializable]
    public class DebugGameBreakModel
    {
        public int LineNumber { get; set; }
        public string VariableLookupResult { get; set; }

        private DebugGameBreakModel() { }

        [ObjectLiteral]
        public DebugGameBreakModel(int lineNumber,string variableLookupResult)
        {
            LineNumber = lineNumber;
            VariableLookupResult = variableLookupResult;
        }
    }
}