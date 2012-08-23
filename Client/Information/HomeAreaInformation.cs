using System;
using System.Runtime.CompilerServices;
using Client.ShuffUI;
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
        public ShuffPropertyBox userList { get; set; }

        [IntrinsicProperty]
        public ShuffPropertyBox gameList { get; set; }

        [IntrinsicProperty]
        public ShuffTextbox txtUserName { get; set; }

        [IntrinsicProperty]
        public ShuffButton btnStartGame { get; set; }

        [IntrinsicProperty]
        public Action<GameRoom> loadRoomInfo { get; set; }
    }
}