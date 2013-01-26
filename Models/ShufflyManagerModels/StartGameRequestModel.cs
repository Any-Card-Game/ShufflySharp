using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class StartGameRequestModel
    {
        private StartGameRequestModel() {}
        public string RoomID { get; set; }

        [ObjectLiteral]
        public StartGameRequestModel(string roomId)
        {
            RoomID = roomId;
        }
    }
}