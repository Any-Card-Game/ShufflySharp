using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class GetRoomInfoRequest
    {
        public string GameType { get; set; }
        public string RoomName { get; set; }

        [ObjectLiteral]
        public GetRoomInfoRequest(string gameType, string roomName)
        {
            GameType = gameType;
            RoomName = roomName;
        }
    }
}