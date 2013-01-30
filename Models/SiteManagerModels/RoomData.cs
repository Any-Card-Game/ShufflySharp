using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using MongoDBLibrary;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class RoomData : MongoDocument
    {
        [ObjectLiteral]
        public RoomData(string gameType, string roomName,string chatChannel, List<UserModel> players)
        {
            GameType = gameType;
            RoomName = roomName;
            ChatChannel = chatChannel;
            Players = players;
        }

        public string GameType { get; set; }
        public string RoomName { get; set; }
        public string ChatChannel { get; set; }
        public List<UserModel> Players { get; set; }
    }
}