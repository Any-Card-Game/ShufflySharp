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
    public class UserCreateResponse
    {
        public bool Successful { get; set; }

        [ObjectLiteral]
        public UserCreateResponse(bool successful)
        {
            Successful = successful;
        }
    }
}