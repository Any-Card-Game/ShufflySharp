using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models;
using Models.ChatManagerModels;
using NodeLibraries.MongoDB;
namespace DataModels.ChatManagerModels
{
    [Serializable]
    public class ChatRoomDataModel : MongoDocument
    {
        public string RoomName { get; set; }
        public List<UserLogicModel> Users { get; set; }
        public List<ChatMessageRoomModel> Messages { get; set; }

        [ObjectLiteral]
        public ChatRoomDataModel(string roomName, List<UserLogicModel> users, List<ChatMessageRoomModel> messages)
        {
            RoomName = roomName;
            Users = users;
            Messages = messages;
        }

        public ChatRoomModel ToModel()
        {
        
            return new ChatRoomModel(RoomName,Users,Messages);
        }
    }
}