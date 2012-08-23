using System;
using System.Runtime.CompilerServices;

namespace Models
{
    [Serializable]
    public  class GameAnswerQuestionModel
    {
        public GameAnswerQuestionModel(string roomId, int answer)
        {
            RoomID = roomId;
            Answer = answer;
        }

        public GameAnswerQuestionModel()
        {
        }

        [IntrinsicProperty]
        public int Answer { get; set; }

        [IntrinsicProperty]
        public string RoomID { get; set; }
    }
}