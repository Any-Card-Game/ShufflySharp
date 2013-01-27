using System;
using System.Runtime.CompilerServices;
namespace Models.GameManagerModels
{
    [Serializable]
    public class JoinGameRequestModel
    {
        public string RoomID { get; set; }
        public UserModel User { get; set; }
        private JoinGameRequestModel() {}

        [ObjectLiteral]
        public JoinGameRequestModel(string roomId, UserModel user)
        {
            RoomID = roomId;
            User = user;
        }
    }
}