using System.Runtime.CompilerServices;

namespace Models
{
    [Record]
    public sealed class GameAnswerQuestionModel
    {
        public GameAnswerQuestionModel(string roomId, int answer)
        {
            RoomID = roomId;
            Answer = answer;
        }

        [IntrinsicProperty]
        public int Answer { get; set; }

        [IntrinsicProperty]
        public string RoomID { get; set; }

        public GameAnswerQuestionModel()
        {
        }

    }
}