using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class GameAnswerModel
    {
        private GameAnswerModel() {}
        public int LineNumber { get; set; }
         public int Value { get; set; }
         [ObjectLiteral]
         public GameAnswerModel(int lineNumber, int value)
        {
            LineNumber = lineNumber;
            Value = value;
        }
    }
}