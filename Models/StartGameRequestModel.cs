using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class StartGameRequestModel
    {
        [IntrinsicProperty]
        public string RoomID { get; set; }

        public StartGameRequestModel(string roomId)
        {
            RoomID = roomId;
        }
    }
}