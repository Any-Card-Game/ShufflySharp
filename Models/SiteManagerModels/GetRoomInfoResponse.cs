using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetRoomInfoResponse
    {
        public RoomData Room { get; set; }

        [ObjectLiteral]
        public GetRoomInfoResponse(RoomData room)
        {
            Room = room;
        }
    }
}