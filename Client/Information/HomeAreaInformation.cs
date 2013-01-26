using System;
using System.Runtime.CompilerServices;
using Client.ShuffUI;
using CommonLibraries;
using CommonShuffleLibrary;
using GameServer;
using GameServer.Models;
using Models.ShufflyManagerModels;
namespace Client.Information
{
    public class HomeAreaInformation
    {
        [IntrinsicProperty]
        public Action<GameAnswerModel> loadRoomInfos { get; set; }
        [IntrinsicProperty]
        public ShuffListBox userList { get; set; }
        [IntrinsicProperty]
        public ShuffListBox gameList { get; set; }
        [IntrinsicProperty]
        public ShuffTextbox txtUserName { get; set; }
        [IntrinsicProperty]
        public ShuffButton btnStartGame { get; set; }
        [IntrinsicProperty]
        public Action<GameRoom> loadRoomInfo { get; set; }
    }
}