using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class RoomJoinRequest
    {
        public string RoomName { get; set; }
        public string GameType { get; set; }

        [ObjectLiteral]
        public RoomJoinRequest(string gameType, string roomName)
        {
            RoomName = roomName;
            GameType = gameType;
        }
    }
}