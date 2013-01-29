using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class RoomData
    {
        [ObjectLiteral]
        public RoomData(string gameType, string roomName, List<UserModel> players)
        {
            GameType = gameType;
            RoomName = roomName;
            Players = players;
        }

        public string GameType { get; set; }
        public string RoomName { get; set; }
        public List<UserModel> Players { get; set; }
    }
}