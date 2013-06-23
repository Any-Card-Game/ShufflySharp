using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetRoomsResponse
    {
        public List<RoomModel> Rooms { get; set; }

        [ObjectLiteral]
        public GetRoomsResponse(List<RoomModel> rooms)
        {
            Rooms = rooms;
        }
    }
}