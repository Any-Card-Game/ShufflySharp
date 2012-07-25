using System;
using System.Collections.Generic;
using CommonLibraries;
using Fibers;
using ShufflyGame;
using ShufflyNode.Common;

namespace ShufflyNode.GameServer
{
    public class GameRoom
    {
        public string Name;
        public string GameName;
        public bool Debuggable;
        public int MaxUsers;
        public List<User> Players;
        public List<GameAnswer> Answers;
        public string RoomID;
        public string GameServer;
        public bool Started;
        public Fiber<List<User>> Fiber;
        public Action<List<User>> Unwind;
        public GameObject Game;

        public User DebuggingSender;
    }
}