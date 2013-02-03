using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using MongoDBLibrary;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class ChatRoomModel : MongoDocument
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