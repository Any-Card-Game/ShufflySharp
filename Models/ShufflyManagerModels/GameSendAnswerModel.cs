using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class GameSendAnswerModel
    {
        public string Question { get; set; }
        public string[] Answers { get; set; }
        private GameSendAnswerModel() {}

        [ObjectLiteral]
        public GameSendAnswerModel(string question, string[] answers)
        {
            Question = question;
            Answers = answers;
        }
    }
}