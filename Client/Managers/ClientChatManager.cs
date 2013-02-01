using Client.Libs;
using Models.ChatManagerModels;
namespace Client.Managers
{
    public class ClientChatManager
    {
        #region Delegates

        public delegate void GetChatInfo(ChatRoomInfoModel o);
        public delegate void GetChatLines(ChatMessagesModel o);

        #endregion

        private readonly Gateway myGateway;

        public ClientChatManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event GetChatLines OnGetChatLines;
        public event GetChatInfo OnGetChatInfo;

        private void Setup()
        {
            myGateway.On("Area.Chat.ChatLines.Response", a => OnGetChatLines((ChatMessagesModel) a));
            myGateway.On("Area.Chat.ChatInfo.Response", a => OnGetChatInfo((ChatRoomInfoModel) a));
        }

        public void SendChatMessage(SendChatMessageModel sendChatMessageModel)
        {
            myGateway.Emit("Area.Chat.SendMessage", sendChatMessageModel);
        }
    }
}