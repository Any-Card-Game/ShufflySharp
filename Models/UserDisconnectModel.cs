using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class UserDisconnectModel
    {
        public UserLogicModel User { get; set; }

        [ObjectLiteral]
        public UserDisconnectModel(UserLogicModel user)
        {
            User = user;
        }
    }
}