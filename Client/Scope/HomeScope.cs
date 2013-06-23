using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models;
using Models.SiteManagerModels;
namespace Client.Scope
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
        public List<RoomModel> Rooms { get; set; }
        public RoomModel SelectedRoom { get; set; }
        public Action GameTypeSelected { get; set; }
        public Action RoomSelected { get; set; }
        public Action CreateRoom { get; set; }
        public Action JoinRoom { get; set; }
        public UserModel User { get; set; }
    }
}