using CommonShuffleLibrary.Data;
namespace CommonShuffleLibrary
{
    public partial class DataManager
    {
        public DataManagerGameData GameData;
        public DataManagerSiteData SiteData;
        private void InitData()
        {
            GameData = new DataManagerGameData(this);
            SiteData = new DataManagerSiteData(this);
        }
    }
}