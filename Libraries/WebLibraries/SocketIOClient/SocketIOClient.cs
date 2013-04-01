using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace WebLibraries.SocketIOClient
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("io")]
    public class SocketIOClient : EventEmitter
    {
        [ScriptName("connect")]
        public static SocketIOClient Connect(string server)
        {
            return null;
        }
        [ScriptName("connect")]
        public SocketIOClient AConnect(string server)
        {
            return null;
        }
        [ScriptName("connect")]
        public SocketIOClient AConnect(string server,dynamic options)
        {
            return null;
        }
        public void Disconnect(bool close)
        {
        }

    }
}