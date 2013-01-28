using System.Runtime.CompilerServices;
namespace SocketIONodeLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class SocketIOClient
    {
        [IntrinsicProperty]
         public SocketNamespace Sockets { get; set; }

        public void Set(string option, object value) {}
    }
}