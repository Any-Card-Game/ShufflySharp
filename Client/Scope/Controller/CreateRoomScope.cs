using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;

namespace Client.Scope.Controller
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
        public Action<string> OnCreateRoom { get; set; }
    }
}