using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using FibersLibrary;
using Models;
using global;

namespace GameServer
{
    public class GameRoom
    {
        public string Name;
        public string GameName;
        public bool Debuggable;
        public int MaxUsers;
        public List<UserModel> Players;
        public List<CardGameAnswer> Answers;
        public string RoomID;
        public string GameServer;
        public bool Started;
        public Fiber<List<UserModel>> Fiber;
        public Action<List<UserModel>> Unwind;
        public GameObject Game;

        public UserModel DebuggingSender;

        public GameRoom()
        {
            Players = new List<UserModel>();
            RoomID = Guid.NewGuid();
            Answers = new List<CardGameAnswer>();
        }
    }
}