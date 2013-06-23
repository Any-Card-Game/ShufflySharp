using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class RoomJoinResponse
    {
        public RoomModel Room { get; set; }

        [ObjectLiteral]
        public RoomJoinResponse(RoomModel room)
        {
            Room = room;
        }
    }
}