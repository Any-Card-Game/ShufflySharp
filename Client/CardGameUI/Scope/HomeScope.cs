using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CardGameUI.Scope;
using Models;
using Models.SiteManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
namespace CardGameUI.Scope
{
    public class HomeScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public HomeModel Model { get; set; } 
    }
    [Serializable]
    public class HomeModel
    {
        public List<GameTypeModel> GameTypes { get; set; }
        public GameTypeModel SelectedGameType { get; set; }
        public List<RoomData> Rooms { get; set; }
        public RoomData SelectedRoom { get; set; }
        public Action GameTypeSelected { get; set; }
        public Action RoomSelected { get; set; }
        public Action CreateRoom { get; set; }
        public Action JoinRoom { get; set; }
        public UserModel User { get; set; }
    }
}