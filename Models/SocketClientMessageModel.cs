using System.Runtime.CompilerServices;
namespace Models
{
    public class SocketClientMessageModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }
        [IntrinsicProperty]
        public object Content { get; set; }
        [IntrinsicProperty]
        public UserModel User { get; set; }

        public SocketClientMessageModel(UserModel user, string channel, object content)
        {
            User = user;
            Channel = channel;
            Content = content;
        }
    }
}