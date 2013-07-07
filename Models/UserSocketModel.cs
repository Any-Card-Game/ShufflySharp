using System;
using NodeLibraries.SocketIONode;
namespace Models
{
    [Serializable]
    public class UserSocketModel
    {
        private UserLogicModel localLogicModel;
        private UserModel localUserModel;
        public string Gateway { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }
        public SocketIOConnection Socket { get; set; }
        public string CurrentGameServer { get; set; }
        public string CurrentChatServer { get; set; }
        public UserSocketModel() {}

        public UserModel ToUserModel()
        {
            var m = localUserModel ?? ( localUserModel = new UserModel() );
            m.Gateway = Gateway;
            m.Hash = Hash;
            m.Password = Password;
            m.UserName = UserName;
            return m;
        }

 
        public UserLogicModel ToLogicModel()
        {
            var m = localLogicModel ?? ( localLogicModel = new UserLogicModel() );
            m.Gateway = Gateway;
            m.Hash = Hash;
            m.CurrentChatServer = CurrentChatServer;
            m.CurrentGameServer = CurrentGameServer;
            m.Password = Password;
            m.UserName = UserName;
            return m;
        }
    }
}