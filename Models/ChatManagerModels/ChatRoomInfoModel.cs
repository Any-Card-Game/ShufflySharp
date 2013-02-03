using System;
using System.Runtime.CompilerServices;
namespace Models.ChatManagerModels
{
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
}