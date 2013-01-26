using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class GameAnswerRequestModel
    {
        private GameAnswerRequestModel() {}
        public int Answer { get; set; }
        public string RoomID { get; set; }
        [ObjectLiteral]
        public GameAnswerRequestModel(int answer, string roomId)
        {
            Answer = answer;
            RoomID = roomId;
        }
    }
}