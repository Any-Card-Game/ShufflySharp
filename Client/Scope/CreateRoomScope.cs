using System;
using System.Runtime.CompilerServices;
namespace Client.Scope
{
    public class CreateRoomScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public CreateRoomModel Model { get; set; } 
    }
    [Serializable]
    public class CreateRoomModel
    {
        public Action WindowClosed { get; set; }
        public string RoomName { get; set; }
        public Action CreateRoom { get; set; } 
    }
}