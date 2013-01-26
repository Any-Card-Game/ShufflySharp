using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class StartGameRequestModel
    {
        public string RoomID { get; set; }
        private StartGameRequestModel() {}

        [ObjectLiteral]
        public StartGameRequestModel(string roomId)
        {
            RoomID = roomId;
        }
    }
}