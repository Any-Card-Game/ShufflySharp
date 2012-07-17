using ShufflyNode.Common;

namespace ShufflyNode
{
    public class SocketClientMessage
    {
        //{ User: User, channel: EventChannel, Content: Content }
        public User User;
        public string Channel;
        public object Content;
        public SocketClientMessage(User user, string channel, object content)
        {
            User = user;
            Channel = channel;
            Content = content;
        }
    }
}