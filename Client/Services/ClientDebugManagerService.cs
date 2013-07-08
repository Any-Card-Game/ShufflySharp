using ClientLibs.Managers;
using Models.GameManagerModels;
namespace Client.Services
{
    public class ClientDebugManagerService
    {
        private readonly ClientDebugManager clientDebugManager;

        public event ClientDebugManager.GetDebugLog OnGetDebugLog;
        public event ClientDebugManager.GetDebugBreak OnGetDebugBreak;
        public event ClientDebugManager.DebugGameOver OnDebugGameOver;
        public ClientDebugManagerService(GatewayService gateway)
        {
            clientDebugManager = new ClientDebugManager(gateway.Gateway);
            clientDebugManager.OnDebugGameOver += (user, model) => { if (OnDebugGameOver != null) OnDebugGameOver(user, model); };
            clientDebugManager.OnGetDebugBreak += (user, model) => { if (OnGetDebugBreak != null) OnGetDebugBreak(user, model); };
            clientDebugManager.OnGetDebugLog += (user, model) => { if (OnGetDebugLog != null) OnGetDebugLog(user, model); };
            
        }

    }
}