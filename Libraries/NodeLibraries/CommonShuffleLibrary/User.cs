
using System.Runtime.CompilerServices;
using SocketIONodeLibrary;

namespace CommonShuffleLibraries
{
    public class User
    {
        [ScriptName("socket")]
        public SocketIOConnection Socket;
        [ScriptName("gateway")]
        public string Gateway;
        [ScriptName("userName")]
        public string UserName;
    }
}