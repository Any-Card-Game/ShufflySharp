using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
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
}