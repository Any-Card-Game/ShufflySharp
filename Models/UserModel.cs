using System;
namespace Models
{
    [Serializable]
    public class UserModel
    {
        public string Gateway { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }
    }
}