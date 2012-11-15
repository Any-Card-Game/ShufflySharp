using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class GameAnswerQuestionModel
    {
        [IntrinsicProperty]
        public int Answer { get; set; }
        [IntrinsicProperty]
        public string RoomID { get; set; }

        public GameAnswerQuestionModel(string roomId, int answer)
        {
            RoomID = roomId;
            Answer = answer;
        }

        public GameAnswerQuestionModel() {}
    }
}