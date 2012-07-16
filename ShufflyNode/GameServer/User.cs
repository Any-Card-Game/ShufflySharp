using SocketIO;

namespace ShufflyNode.GameServer
{
    public class User
    {
        private string userName;
        private SocketIOConnection socket;
        public SocketIOConnection Socket
        {
            get { return socket; }
            set { socket = value; }
        }

        public string UserName
        {
            get { return userName; }
            set { userName = value; }
        }
    }
}