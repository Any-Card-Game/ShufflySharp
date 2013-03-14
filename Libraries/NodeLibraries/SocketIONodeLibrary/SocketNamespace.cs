using System.Collections.Generic;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace SocketIONodeLibrary
{
    [IgnoreNamespace]
    [Imported]
    public class SocketNamespace : EventEmitter
    {
        [IntrinsicProperty]
        public JsDictionary<string, Socket> Sockets { get; set; }
    }
}