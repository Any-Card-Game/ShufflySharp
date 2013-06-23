using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class ChatRoomModel 
    {
        public string RoomName { get; set; }
        public List<UserLogicModel> Users { get; set; }
        public List<ChatMessageRoomModel> Messages { get; set; }

        [ObjectLiteral]
        public ChatRoomModel(string roomName, List<UserLogicModel> users, List<ChatMessageRoomModel> messages)
        {
            RoomName = roomName;
            Users = users;
            Messages = messages;
        }
    }
}