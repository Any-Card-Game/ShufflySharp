using Client.Libs;
using Models.ChatManagerModels;
namespace Client.Managers
{
    public class ClientChatManager
    {
        public delegate void GetChatContent(GetChatInfoMessages o);
         

        private readonly Gateway myGateway;

        public ClientChatManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        } 

        private void Setup()
        {
            myGateway.On("Area.Chat.GetChatContent", a => OnGetChatContent((GetChatInfoMessages)a));
        }

        public void RegisterChatChannel(string chatChannel)
        {
            myGateway.Emit("Area.Chat.RegisterChatChannel", new RegisterChatChannelModel(chatChannel));
        }

        public event GetChatContent OnGetChatContent;
    }
}