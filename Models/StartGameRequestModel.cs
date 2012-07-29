using System.Runtime.CompilerServices;

namespace Models
{
    [Record]
    public sealed class StartGameRequestModel
    {
        public StartGameRequestModel(string roomId)
        {
            RoomID = roomId;
        }

        [IntrinsicProperty]
        public string RoomID { get; set; }
    }
}