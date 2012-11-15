using System.Runtime.CompilerServices;
using SocketIONodeLibrary;
namespace Models
{
    public class UserModel
    {
        [ScriptName("gateway")]
        [IntrinsicProperty]
        public string Gateway { get; set; }
        [ScriptName("userName")]
        [IntrinsicProperty]
        public string UserName { get; set; }
        [ScriptName("socket")]
        [IntrinsicProperty]
        public SocketIOConnection Socket { get; set; }
    }
}