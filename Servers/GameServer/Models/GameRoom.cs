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
        public UserModel DebuggingSender { get; set; }
        public Fiber<List<UserModel>> Fiber { get; set; }
        public GameObject Game { get; set; }
        public string GameName { get; set; }
        public string GameServer { get; set; }
        public int MaxUsers { get; set; }
        public string Name { get; set; }
        public List<UserModel> Players { get; set; }
        public string RoomID { get; set; }
        public bool Started { get; set; }
        public Action<List<UserModel>> Unwind { get; set; }

        public GameRoom()
        {
            Players = new List<UserModel>();
            RoomID = Guid.NewGuid();
            Answers = new List<CardGameAnswer>();
        }
    }
}