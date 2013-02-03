using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
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
}