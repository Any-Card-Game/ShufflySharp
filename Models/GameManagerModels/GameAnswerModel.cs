using System;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
{
    [Serializable]
    public class GameAnswerModel
    {
        public int LineNumber { get; set; }
        public int Value { get; set; }
        private GameAnswerModel() {}

        [ObjectLiteral]
        public GameAnswerModel(int lineNumber, int value)
        {
            LineNumber = lineNumber;
            Value = value;
        }
    }
}