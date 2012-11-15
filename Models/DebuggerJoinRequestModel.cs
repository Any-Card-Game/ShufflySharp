using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class DebuggerJoinRequestModel
    {
        [IntrinsicProperty]
        public string RoomID { get; set; }

        public DebuggerJoinRequestModel(string roomId)
        {
            RoomID = roomId;
        }
    }
}