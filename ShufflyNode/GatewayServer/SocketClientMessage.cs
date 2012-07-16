using ShufflyNode.GameServer;

namespace ShufflyNode
{
    public class SocketClientMessage
    {
        //{ user: user, channel: eventChannel, content: content }
        public User User;
        public string Channel;
        public string Content;
        public SocketClientMessage(User user, string channel, string content)
        {
            User = user;
            Channel = channel;
            Content = content;
        }
    }
}