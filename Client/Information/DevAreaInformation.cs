using System;
using System.Runtime.CompilerServices;
using Client.ShuffUI;
using CommonShuffleLibrary;
using GameServer;
using GameServer.Models;
namespace Client.Information
{
    public class DevAreaInformation
    {
        [IntrinsicProperty]
        public ShuffTextbox txtNumOfPlayers { get; set; }
        [IntrinsicProperty]
        public Action<GameRoom> loadRoomInfo { get; set; }
        [IntrinsicProperty]
        public ShuffTextbox varText { get; set; }
        [IntrinsicProperty]
        public ShuffLabel lblAnother { get; set; }
        [IntrinsicProperty]
        public ShuffLabel lblHowFast { get; set; }
        [IntrinsicProperty]
        public string gameServer { get; set; }
        [IntrinsicProperty]
        public Action beginGame { get; set; }
        [IntrinsicProperty]
        public int Joined { get; set; }
        [IntrinsicProperty]
        public bool Created { get; set; }
    }
}