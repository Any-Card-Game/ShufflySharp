using System;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels;
namespace Models.ChatManagerModels
{
    [Serializable]
    public sealed class JoinChatRoomRequest
    {
        public RoomData Room { get; set; }

        [ObjectLiteral]
        public JoinChatRoomRequest(RoomData room)
        {
            Room = room;
        }
    }
}