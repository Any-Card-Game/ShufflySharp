using ClientLibs.Managers;
using Models.ChatManagerModels;

namespace Client.Services
{
    public class ClientChatManagerService
    {
        public const string Name = "ClientChatManagerService";
        private readonly ClientChatManager clientChatManager;

        public ClientChatManagerService(GatewayService gateway)
        { 

            clientChatManager = new ClientChatManager(gateway.Gateway);
            clientChatManager.OnGetChatInfo += (user, model) => OnGetChatInfo.Trigger(user, model);
            clientChatManager.OnGetChatLines += (user, model) => OnGetChatLines.Trigger(user, model);
        }
         
        public UserEventCacher<ChatRoomInfoModel> OnGetChatInfo=new UserEventCacher<ChatRoomInfoModel>();
        public UserEventCacher<ChatMessagesModel> OnGetChatLines=new UserEventCacher<ChatMessagesModel>();

        public void SendChatMessage(SendChatMessageModel sendChatMessageModel)
        {
            clientChatManager.SendChatMessage(sendChatMessageModel);
        }
    }
}