using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class LeaveRoomRequest
    {
        public RoomData Room { get; set; }

        [ObjectLiteral]
        public LeaveRoomRequest(RoomData room)
        {
            Room = room;
        }
    }
}