namespace GameServer
{
    public class DataManagerGameData
    {
        private DataManager manager;

        public DataManagerGameData(DataManager manager)
        {
            this.manager = manager;
        }

        public void Insert(string gameName, int answerIndex)
        {
            manager.client.Collection("gameInfo", (err, collection) =>
                {
                    var gmo = new GameInfoObject();
                    gmo.GameName = gameName;
                    gmo.Answer = answerIndex;
                    collection.Insert(gmo);
                });
        }
    }

    public class GameInfoObject //todo:DATABASEMODEL
    {
        public int Answer;
        public string GameName;
    }
}