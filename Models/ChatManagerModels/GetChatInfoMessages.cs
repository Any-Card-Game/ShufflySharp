using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
    [Serializable]
    public class GetChatInfoMessages
    {
        [ObjectLiteral]

        public GetChatInfoMessages(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
    [Serializable]
    public class RegisterChatChannelModel
    {
        [ObjectLiteral]

        public RegisterChatChannelModel(string channel)
        {
            Channel = channel;
        }

        public string Channel { get; set; }
    }
    
}