using System;
using System.Collections.Generic;
using CommonLibraries;
using global;
using Models;
using NodeLibraries.Fibers;

namespace ServerManager.DebugGameServer.Models
{
    [Serializable]
    public class DebugGameRoom
    {
        public List<CardGameAnswer> EmulatedAnswers { get; set; }
        public UserLogicModel DebuggingSender { get; set; }
        public Fiber<List<UserLogicModel>> Fiber { get; set; }
        public GameObject Game { get; set; }
        public string GameType{ get; set; }
        public int MaxUsers { get; set; }
        public List<UserLogicModel> Players { get; set; }
        public string RoomID { get; set; }
        public bool Started { get; set; }
        public Action<List<UserLogicModel>> Unwind { get; set; }
        public Action<UserLogicModel> PlayerLeave { get; set; }
        public List<UserLogicModel> PlayersLeft { get; set; }

        public DebugGameRoom()
        {
            Players = new List<UserLogicModel>();
            RoomID = Guid.NewGuid().ToString();
            EmulatedAnswers = new List<CardGameAnswer>();
        }
    }
}