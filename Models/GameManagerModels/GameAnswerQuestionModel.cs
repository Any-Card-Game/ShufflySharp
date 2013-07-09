using System;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
{
    [Serializable]
    public class GameAnswerQuestionModel
    {
        public int Answer { get; set; }
        private GameAnswerQuestionModel() {}

        [ObjectLiteral]
        public GameAnswerQuestionModel( int answer)
        {
            Answer = answer;
        }
    }

}