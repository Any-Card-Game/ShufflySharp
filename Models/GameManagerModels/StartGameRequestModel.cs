using System;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
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