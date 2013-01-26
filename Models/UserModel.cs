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
        [IntrinsicProperty]
        public SocketIOConnection Socket { get; set; }

        public override string ToString()
        {
            return string.Format("User {{{0} - {1}}}", Gateway, UserName);
        }
    }
}