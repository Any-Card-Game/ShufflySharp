using System;
using System.Runtime.CompilerServices;

namespace Models.DebugGameManagerModels
{
    [Serializable]
    public class DebugGameAnswerQuestionModel
    {
        public int Answer { get; set; }
        private DebugGameAnswerQuestionModel() { }

        [ObjectLiteral]
        public DebugGameAnswerQuestionModel( int answer)
        {
            Answer = answer;
        }
    }
}