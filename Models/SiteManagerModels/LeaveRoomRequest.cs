using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class LeaveRoomRequest
    {
        public RoomModel Room { get; set; }

        [ObjectLiteral]
        public LeaveRoomRequest(RoomModel room)
        {
            Room = room;
        }
    }
}