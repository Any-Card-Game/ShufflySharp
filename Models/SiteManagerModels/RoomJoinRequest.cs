using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    [Serializable]
    public class RoomJoinRequest
    {
        public string RoomName { get; set; }
        public string GameType { get; set; }

        [ObjectLiteral]
        public RoomJoinRequest(string gameType, string roomName)
        {
            RoomName = roomName;
            GameType = gameType;
        }
    }
    [Serializable]
    public class LeaveRoomRequest
    {
        public RoomData Room { get; set; }

        [ObjectLiteral]
        public LeaveRoomRequest(RoomData room)
        {
            Room = room;
        }
    }
    [Serializable]
    public class RoomJoinResponse
    {
        public RoomData Room { get; set; }

        [ObjectLiteral]
        public RoomJoinResponse(RoomData room)
        {
            Room = room;
        }
    }
}