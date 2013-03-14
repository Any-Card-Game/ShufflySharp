using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace SocketIONodeLibrary
{
    [IgnoreNamespace]
    [Imported]
    public class SocketIOConnection : EventEmitter {
        [IntrinsicProperty,ScriptName("id")]

        public string ID { get; set; }
    }
}