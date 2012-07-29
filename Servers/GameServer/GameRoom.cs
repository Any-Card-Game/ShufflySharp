using System;
using System.Collections.Generic;
using CommonLibraries;
using FibersLibrary;
using Models;
using global;

namespace GameServer
{
    public class GameRoom
    {
        public List<CardGameAnswer> Answers;
        public bool Debuggable;
        public UserModel DebuggingSender;
        public Fiber<List<UserModel>> Fiber;
        public GameObject Game;
        public string GameName;
        public string GameServer;
        public int MaxUsers;
        public string Name;
        public List<UserModel> Players;
        public string RoomID;
        public bool Started;
        public Action<List<UserModel>> Unwind;

        public GameRoom()
        {
            Players = new List<UserModel>();
            RoomID = Guid.NewGuid();
            Answers = new List<CardGameAnswer>();
        }
    }
}