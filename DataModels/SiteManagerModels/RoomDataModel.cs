using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models;
using Models.SiteManagerModels;
using NodeLibraries.MongoDB;
namespace DataModels.SiteManagerModels
{
    [Serializable]
    public class RoomDataModel : MongoDocument
    {
        public string GameType { get; set; }
        public string RoomName { get; set; }
        public string ChatChannel { get; set; }
        public string GameChannel { get; set; }
        public string ChatServer { get; set; }
        public string GameServer { get; set; }
        public List<UserLogicModel> Players { get; set; }

        [ObjectLiteral]
        public RoomDataModel(string gameType, string roomName, string chatChannel, string gameChannel, List<UserLogicModel> players, string chatServer = null, string gameServer = null)
        {
            GameType = gameType;
            RoomName = roomName;
            ChatChannel = chatChannel;
            GameChannel = gameChannel;
            ChatServer = chatServer;
            GameServer = gameServer;
            Players = players;
        }
        public RoomModel ToModel()
        {
            return new RoomModel(GameType, RoomName, ChatChannel, GameChannel, Players, ChatServer, GameServer) {ID = ID};
        }
    }
}