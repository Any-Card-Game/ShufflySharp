using System;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
using Client;
using Models.SiteManagerModels;
namespace CardGameUI.Services
{
    internal class UIManagerService
    {
        [IntrinsicProperty]
        public Action UserLoggedIn { get; set; }
        [IntrinsicProperty]
        public Action<string> CreateRoom { get; set; }
        [IntrinsicProperty]
        public Action OpenCreateRoomDialog { get; set; }
        [IntrinsicProperty]
        public Action<RoomData> OnRoomJoined { get; set; }

        public PageHandler PageHandler { get { return PageHandler.Handler; } }

        [IntrinsicProperty]
        public Action RoomLeft { get; set; }

    }
}
            
