using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
using GameServer;
using jQueryApi;

namespace Client.Information
{
    public class HomeAreaInformation
    {
        [IntrinsicProperty]
        public Action<GameAnswer> loadRoomInfos { get; set; }
        [IntrinsicProperty]
        public jQueryObject userList { get; set; }

        [IntrinsicProperty]
        public jQueryObject gameList { get; set; }

        [IntrinsicProperty]
        public jQueryObject txtUserName { get; set; }
        [IntrinsicProperty]
        public jQueryObject btnStartGame { get; set; }
        [IntrinsicProperty]
        public Action<GameRoom> loadRoomInfo { get; set; }
    }
}