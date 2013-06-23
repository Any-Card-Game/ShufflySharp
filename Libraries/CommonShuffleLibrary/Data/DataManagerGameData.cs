using DataModels.GameManagerModels;
namespace CommonShuffleLibrary.Data
{
    public class DataManagerGameData
    {
        private DataManager manager;

        public DataManagerGameData(DataManager manager)
        {
            this.manager = manager;
        }

        public void Insert(GameInfoDataModel gmo)
        {
            manager.client.Collection("gameInfo",
                                      (err, collection) => { collection.Insert(gmo); });
        }
    }
}