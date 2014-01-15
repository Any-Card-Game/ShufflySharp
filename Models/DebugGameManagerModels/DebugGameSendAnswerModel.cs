using System;
using System.Runtime.CompilerServices;

namespace Models.DebugGameManagerModels
{
    [Serializable]
    public class DebugGameSendAnswerModel
    {
        public string Question { get; set; }
        public string[] Answers { get; set; }
        private DebugGameSendAnswerModel() { }

        [ObjectLiteral]
        public DebugGameSendAnswerModel(string question, string[] answers)
        {
            Question = question;
            Answers = answers;
        }
    }
}