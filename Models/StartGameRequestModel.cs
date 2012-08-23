using System;
using System.Runtime.CompilerServices;

namespace Models
{
    [Serializable]
    public  class StartGameRequestModel
    {
        public StartGameRequestModel(string roomId)
        {
            RoomID = roomId;
        }

        [IntrinsicProperty]
        public string RoomID { get; set; }
    }
}