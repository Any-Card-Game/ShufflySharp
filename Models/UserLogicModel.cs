using System;
namespace Models
{
    [Serializable]
    public class UserLogicModel
    {
        public UserLogicModel() {}
        public string Gateway { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }
        public string CurrentGameServer { get; set; }
        public string CurrentChatServer { get; set; }

     }
}