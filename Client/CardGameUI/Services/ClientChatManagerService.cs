using ClientLibs.Managers;
using Models.ChatManagerModels;
namespace CardGameUI.Services
{
    public class ClientChatManagerService
    {


        public event ClientChatManager.GetChatLines OnGetChatLines;
        public event ClientChatManager.GetChatInfo OnGetChatInfo;

        private readonly ClientChatManager clientChatManager;

        public ClientChatManagerService(GatewayService gateway)
        {
            clientChatManager = new ClientChatManager(gateway.Gateway);
            clientChatManager.OnGetChatInfo += (user, model) => { if (OnGetChatInfo != null) OnGetChatInfo(user, model); };
            clientChatManager.OnGetChatLines += (user, model) => { if (OnGetChatLines != null) OnGetChatLines(user, model); };
        }
        public void SendChatMessage(SendChatMessageModel sendChatMessageModel)
        {
            clientChatManager.SendChatMessage(sendChatMessageModel);
        }

    }
}