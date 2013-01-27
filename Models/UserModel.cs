using System.Runtime.CompilerServices;
using SocketIONodeLibrary;
namespace Models
{
    public class UserModel
    {
        [IntrinsicProperty]
        public string Gateway { get; set; }
        [IntrinsicProperty]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }

        public override string ToString()
        {
            return string.Format("User {{{0} - {1}}}", Gateway, UserName);
        }
    }
    public class UserSocketModel
    {
        private UserModel localUserModel;
        [IntrinsicProperty]
        public string Gateway { get; set; }
        [IntrinsicProperty]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }
        [IntrinsicProperty]
        public SocketIOConnection Socket { get; set; }

        public override string ToString()
        {
            return string.Format("User {{{0} - {1}}}", Gateway, UserName);
        }

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