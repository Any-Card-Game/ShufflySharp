using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
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
}