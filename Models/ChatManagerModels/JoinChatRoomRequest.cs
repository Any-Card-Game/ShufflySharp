using System;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels;
namespace Models.ChatManagerModels
{
    [Serializable]
    public sealed class JoinChatRoomRequest
    {
        public RoomModel Room { get; set; }

        [ObjectLiteral]
        public JoinChatRoomRequest(RoomModel room)
        {
            Room = room;
        }
    }
}