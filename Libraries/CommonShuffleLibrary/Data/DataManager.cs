using CommonShuffleLibrary.Data;
namespace CommonShuffleLibrary
{
    public partial class DataManager
    {
        public DataManagerChatData ChatData;
        public DataManagerGameData GameData;
        public DataManagerSiteData SiteData;

        private void InitData()
        {
            GameData = new DataManagerGameData(this);
            ChatData = new DataManagerChatData(this);
            SiteData = new DataManagerSiteData(this);
        }
    }
}