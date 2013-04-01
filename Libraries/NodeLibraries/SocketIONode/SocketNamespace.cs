using System.Collections.Generic;
using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.SocketIONode
{
    [IgnoreNamespace]
    [Imported]
    public class SocketNamespace : EventEmitter
    {
        [IntrinsicProperty]
        public JsDictionary<string, Socket> Sockets { get; set; }
    }
}