using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class CreateChatRoomRequest
    {
        public string RoomName { get; set; }

        [ObjectLiteral]
        public CreateChatRoomRequest(string roomName)
        {
            RoomName = roomName;
        }
    }
}