using System;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class CreateChatRoomRequest
    {
        public RoomModel Room { get; set; }


        [ObjectLiteral]
        public CreateChatRoomRequest(RoomModel room)
        {
            Room = room;
        }
    }
}