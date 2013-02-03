using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
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