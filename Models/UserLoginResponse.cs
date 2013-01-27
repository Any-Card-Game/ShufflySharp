using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class UserLoginResponse
    {
        public bool Successful { get; set; }
        public string Hash { get; set; }

        [ObjectLiteral]
        public UserLoginResponse(bool successful, string hash)
        {
            Successful = successful;
            Hash = hash;
        }
    }
}