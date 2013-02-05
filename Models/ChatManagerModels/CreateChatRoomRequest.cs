using System;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class CreateChatRoomRequest
    {
        public RoomData Room { get; set; }


        [ObjectLiteral]
        public CreateChatRoomRequest(RoomData room)
        {
            Room = room;
        }
    }
}