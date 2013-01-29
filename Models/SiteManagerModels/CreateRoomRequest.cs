using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class CreateRoomRequest
    {
        public string GameType { get; set; }
        public string RoomName { get; set; }

        [ObjectLiteral]
        public CreateRoomRequest(string gameType, string roomName)
        {
            GameType = gameType;
            RoomName = roomName;
        }
    }
}