using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
    [Serializable]
    public sealed class JoinChatRoomRequest
    {
        public string RoomName { get; set; }

        [ObjectLiteral]
        public JoinChatRoomRequest(string roomName)
        {
            RoomName = roomName;
        }
    }
}