using System;
using System.Runtime.CompilerServices;
namespace Models.SiteManagerModels
{
    
    [Serializable]
    public class SiteCreateUserRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        [ObjectLiteral]
        public SiteCreateUserRequest(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }
    }
    [Serializable]
    public class SiteLoginRequest
    {
        public string Hash { get; set; }

        [ObjectLiteral]
        public SiteLoginRequest(string hash)
        {
            Hash = hash;
        }
    }
}