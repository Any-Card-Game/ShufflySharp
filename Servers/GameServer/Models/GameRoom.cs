using System;
using System.Collections.Generic;
using CommonLibraries;
using FibersLibrary;
using Models;
using global;
namespace GameServer.Models
{
    [Serializable]
    public class GameRoom
    {
        public List<CardGameAnswer> Answers { get; set; }
        public bool Debuggable { get; set; }
        public UserLogicModel DebuggingSender { get; set; }
        public Fiber<List<UserLogicModel>> Fiber { get; set; }
        public GameObject Game { get; set; }
        public string GameType{ get; set; }
        public int MaxUsers { get; set; }
        public List<UserLogicModel> Players { get; set; }
        public string RoomID { get; set; }
        public bool Started { get; set; }
        public Action<List<UserLogicModel>> Unwind { get; set; }

        public GameRoom()
        {
            Players = new List<UserLogicModel>();
            RoomID = Guid.NewGuid();
            Answers = new List<CardGameAnswer>();
        }
    }
}