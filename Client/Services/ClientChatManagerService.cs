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
            clientChatManager.OnGetChatInfo +=
                (user, model) => { if (OnGetChatInfo != null) OnGetChatInfo(user, model); };
            clientChatManager.OnGetChatLines +=
                (user, model) => { if (OnGetChatLines != null) OnGetChatLines(user, model); };
        }

        public event ClientChatManager.GetChatLines OnGetChatLines;
        public event ClientChatManager.GetChatInfo OnGetChatInfo;

        public void SendChatMessage(SendChatMessageModel sendChatMessageModel)
        {
            clientChatManager.SendChatMessage(sendChatMessageModel);
        }
    }
}