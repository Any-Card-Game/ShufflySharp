namespace Models
{
    public class SocketClientMessageModel
    {
        public UserModel User;
        public string Channel;
        public object Content;
        public SocketClientMessageModel(UserModel user, string channel, object content)
        {
            User = user;
            Channel = channel;
            Content = content;
        }
    }
}