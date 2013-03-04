using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace SocketIOWebLibrary
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
        public   SocketIOClient AConnect(string server)
        {
            return null;
        }
    }
}