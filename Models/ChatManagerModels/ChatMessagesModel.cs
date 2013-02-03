using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using MongoDBLibrary;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class ChatMessagesModel
    {
        public List<ChatMessageRoomModel> Messages { get; set; }

        [ObjectLiteral]
        public ChatMessagesModel(List<ChatMessageRoomModel> messages)
        {
            Messages = messages;
        }
    }
    [Serializable]
    public class RegisterChatServerModel
    {
        [ObjectLiteral]
        public RegisterChatServerModel(string chatServer)
        {
            ChatServer = chatServer;
        }

        public string ChatServer { get; set; }
    }


    [Serializable]
    public class ChatRoomInfoModel
    {
        public ChatRoomModel Info { get; set; }

        [ObjectLiteral]
        public ChatRoomInfoModel(ChatRoomModel info)
        {
            Info = info;
        }
    }
    [Serializable]
    public class RegisterChatChannelModel
    {
        public string Channel { get; set; }

        [ObjectLiteral]
        public RegisterChatChannelModel(string channel)
        {
            Channel = channel;
        }
    }
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
    [Serializable]
    public sealed class ChatMessageRoomModel
    {
        public UserLogicModel User { get; set; }
        public string Content { get; set; }
        public DateTime Time { get; set; }

        [ObjectLiteral]
        public ChatMessageRoomModel(UserLogicModel user, string content, DateTime time)
        {
            User = user;
            Content = content;
            Time = time;
        }
    }
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
    [Serializable]
    public class SendChatMessageModel
    {
        public string Message { get; set; }

        [ObjectLiteral]
        public SendChatMessageModel(string message)
        {
            Message = message;
        }
    }
}