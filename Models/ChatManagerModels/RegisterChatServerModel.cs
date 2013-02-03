using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class RegisterChatServerModel
    {
        public string ChatServer { get; set; }

        [ObjectLiteral]
        public RegisterChatServerModel(string chatServer)
        {
            ChatServer = chatServer;
        }
    }
}