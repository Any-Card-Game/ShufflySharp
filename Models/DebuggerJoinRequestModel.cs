using System.Runtime.CompilerServices;

namespace Models
{
    [Record]
    public sealed class DebuggerJoinRequestModel
    {
        public DebuggerJoinRequestModel(string roomId)
        {
            RoomID = roomId;
        }

        [IntrinsicProperty]
        public string RoomID { get; set; }
    }
}