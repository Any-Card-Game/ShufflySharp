using System;
using System.Runtime.CompilerServices;
using SocketIONodeLibrary;
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
    [Serializable]
    public class UserSocketModel
    {
        private UserModel localUserModel;
        public string Gateway { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }
        public SocketIOConnection Socket { get; set; }
         

        public UserModel ToUserModel()
        {
            var m = localUserModel ?? ( localUserModel = new UserModel() );
            m.Gateway = Gateway;
            m.Hash = Hash;
            m.Password = Password;
            m.UserName = UserName;
            return m;
        }
    }

}