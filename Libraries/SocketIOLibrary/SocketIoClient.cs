using System.Runtime.CompilerServices;

namespace SocketIOLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]

    public class SocketIoClient
    {
        private SocketNamespace sockets;

        [ScriptName("set")]
        public void Set(string option, int value)
        {
        }

        [ScriptName("sockets")] public SocketNamespace Sockets;
    }
}