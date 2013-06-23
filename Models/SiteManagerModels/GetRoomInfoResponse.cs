using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetRoomInfoResponse
    {
        public RoomModel Room { get; set; }

        [ObjectLiteral]
        public GetRoomInfoResponse(RoomModel room)
        {
            Room = room;
        }
    }
}