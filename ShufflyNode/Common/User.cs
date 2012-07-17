using SocketIO;

namespace ShufflyNode.Common
{
    public class User
    {
        public SocketIOConnection Socket;
        public string Gateway;
        public string UserName;
    }
}