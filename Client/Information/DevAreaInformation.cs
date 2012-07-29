using System;
using System.Runtime.CompilerServices;
using GameServer;
using jQueryApi;

namespace Client.Information
{
    public class DevAreaInformation
    {
        [IntrinsicProperty]
        public jQueryObject txtNumOfPlayers { get; set; }
        [IntrinsicProperty]
        public Action<GameRoom> loadRoomInfo { get; set; }
        [IntrinsicProperty]
        public jQueryObject varText { get; set; }
        [IntrinsicProperty]
        public jQueryObject lblAnother { get; set; }
        [IntrinsicProperty]
        public jQueryObject lblHowFast { get; set; }
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