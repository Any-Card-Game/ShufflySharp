using System;
using System.Runtime.CompilerServices;

namespace Models.DebugGameManagerModels
{
    [Serializable]
    public class DebuggerJoinRequestModel
    {
        public string RoomID { get; set; }

        [ObjectLiteral]
        public DebuggerJoinRequestModel(string roomId)
        {
            RoomID = roomId;
        }

        private DebuggerJoinRequestModel() {}
    }
}