using System;
using System.Runtime.CompilerServices;
namespace Models.ShufflyManagerModels
{
    [Serializable]
    public class JoinGameRequestModel
    {
        private JoinGameRequestModel() {}
        public string RoomID { get; set; }
        public UserModel User { get; set; }

        [ObjectLiteral]
        public JoinGameRequestModel(string roomId, UserModel user)
        {
            RoomID = roomId;
            User = user;
        }
    }
}