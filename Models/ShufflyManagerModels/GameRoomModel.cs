using System;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class GameRoomModel
    {
        public string RoomID { get; set; }
        public string GameServer { get; set; }
    }
}