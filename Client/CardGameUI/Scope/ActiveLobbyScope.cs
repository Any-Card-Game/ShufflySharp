using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models;
using Models.ChatManagerModels;
using Models.SiteManagerModels;
namespace CardGameUI.Scope
{

    public class ActiveLobbyScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public ActiveLobbyModel Model { get; set; }


    }
    [Serializable]
    public class ActiveLobbyModel
    {
        public Action WindowClosed { get; set; }
        public RoomData Room { get; set; }
        public List<ChatMessageRoomModel> ChatLines{get;set;}
        public List<UserLogicModel> Users { get; set; }
        public Action SendChatMessage { get; set; }
        public string CurrentChatMessage { get; set; }
    }
}