using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class GameAnswerQuestionModel
    {
        public int Answer { get; set; }
        public string RoomID { get; set; }
        private GameAnswerQuestionModel() {}

        [ObjectLiteral]
        public GameAnswerQuestionModel(string roomId, int answer)
        {
            RoomID = roomId;
            Answer = answer;
        }
    }
}