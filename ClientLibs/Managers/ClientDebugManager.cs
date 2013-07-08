using Models;
using Models.DebugGameManagerModels;
using Models.GameManagerModels;
namespace ClientLibs.Managers
{
    public class ClientDebugManager
    {
                #region Delegates

        public delegate void DebugGameOver(UserModel user, string o);
        public delegate void GetDebugBreak(UserModel user, DebugGameBreakModel o);
        public delegate void GetDebugLog(UserModel user, DebugGameLogModel o);

        #endregion

        private readonly Gateway myGateway;

        public ClientDebugManager(Gateway gateway)
        {
            myGateway = gateway;
            Setup();
        }

        public event GetDebugLog OnGetDebugLog;
        public event GetDebugBreak OnGetDebugBreak; 
        public event DebugGameOver OnDebugGameOver;

        private void Setup()
        {

            myGateway.On("Area.Debug.Log", (user, data) => { if (OnGetDebugLog != null) OnGetDebugLog(user, (DebugGameLogModel)data); });
            myGateway.On("Area.Debug.Break", (user, data) => { if (OnGetDebugBreak != null) OnGetDebugBreak(user, (DebugGameBreakModel)data); });
            myGateway.On("Area.Debug.GameOver", (user, data) => { if (OnDebugGameOver != null) OnDebugGameOver(user, (string) data); });
        }

    }
}