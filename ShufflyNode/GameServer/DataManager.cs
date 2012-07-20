namespace ShufflyNode.GameServer
{
    public class DataManager
    {
        public DataManagerGameData GameData;
        public DataManager()
        {
            GameData = new DataManagerGameData(this);
        }
    }

    public class DataManagerGameData
    {
        private readonly DataManager manager;

        public DataManagerGameData(DataManager manager)
        {
            this.manager = manager;
        }

        public void Insert(string key, object value)
        {

        }
    }
}