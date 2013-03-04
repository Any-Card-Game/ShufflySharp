using System.Runtime.CompilerServices;
namespace SocketIONodeLibrary
{
    [IgnoreNamespace]
    [Imported]
    public class SocketIOClient
    {
        [IntrinsicProperty]
        public SocketNamespace Sockets { get; set; }
        public void Set(string option, object value) {}
    }
}