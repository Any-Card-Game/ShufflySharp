using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class RoomJoinResponse
    {
        public RoomData Room { get; set; }

        [ObjectLiteral]
        public RoomJoinResponse(RoomData room)
        {
            Room = room;
        }
    }
}