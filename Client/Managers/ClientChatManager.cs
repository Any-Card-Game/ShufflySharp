using Client.Libs;
using Models;
using Models.ChatManagerModels;
namespace Client.Managers
{
    public class ClientChatManager
    {
        #region Delegates

        public delegate void GetChatInfo(UserModel user, ChatRoomInfoModel o);
        public delegate void GetChatLines(UserModel user, ChatMessagesModel o);

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
            myGateway.On("Area.Chat.ChatLines.Response", (user,data) => OnGetChatLines(user,(ChatMessagesModel) data));
            myGateway.On("Area.Chat.ChatInfo.Response", (user, data) => OnGetChatInfo(user ,(ChatRoomInfoModel)data));
        }

        public void SendChatMessage(SendChatMessageModel sendChatMessageModel)
        {
            myGateway.Emit("Area.Chat.SendMessage", sendChatMessageModel);
        }
    }
}