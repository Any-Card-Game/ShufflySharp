using Models;
namespace CommonShuffleLibrary
{
    public class QueueMessage
    {
        public object Content;
        public string EventChannel;
        public string Name;
        public UserLogicModel User;

        public QueueMessage(string name, UserLogicModel user, string eventChannel, object content)
        {
            Name = name;
            User = user;
            EventChannel = eventChannel;
            Content = content;
        }
    }
}