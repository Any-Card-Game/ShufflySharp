using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class UserLoginResponse
    {
        public bool Successful { get; set; } 

        [ObjectLiteral]
        public UserLoginResponse(bool successful)
        {
            Successful = successful; 
        }
    }
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