using System;
using System.Runtime.CompilerServices;

namespace Models.DebugGameManagerModels
{
    [Serializable]
    public class DebugJoinGameRequestModel
    {
        public string RoomID { get; set; }
        public UserLogicModel User { get; set; }
        private DebugJoinGameRequestModel() {}

        [ObjectLiteral]
        public DebugJoinGameRequestModel(string roomId, UserLogicModel user)
        {
            RoomID = roomId;
            User = user;
        }
    }
}