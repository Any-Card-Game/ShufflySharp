using System;
using System.Runtime.CompilerServices;

namespace Models
{
    [Serializable]
    public  class DebuggerJoinRequestModel
    {
        public DebuggerJoinRequestModel(string roomId)
        {
            RoomID = roomId;
        }

        [IntrinsicProperty]
        public string RoomID { get; set; }
    }
}