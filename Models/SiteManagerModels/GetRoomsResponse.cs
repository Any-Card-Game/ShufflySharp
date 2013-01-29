using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetRoomsResponse
    {
        public List<RoomData> Rooms { get; set; }
        [ObjectLiteral]
        public GetRoomsResponse(List<RoomData> rooms)
        {
            Rooms = rooms;
        }
    }
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