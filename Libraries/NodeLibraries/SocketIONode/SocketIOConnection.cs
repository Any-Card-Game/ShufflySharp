using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.SocketIONode
{
    [IgnoreNamespace]
    [Imported]
    public class SocketIOConnection : EventEmitter {
        [IntrinsicProperty,ScriptName("id")]

        public string ID { get; set; }
    }
}