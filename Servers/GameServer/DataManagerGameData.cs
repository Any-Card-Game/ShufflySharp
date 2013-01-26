using System;
namespace GameServer
{
    public class DataManagerGameData
    {
        private DataManager manager;

        public DataManagerGameData(DataManager manager)
        {
            this.manager = manager;
        }

        public void Insert(GameInfoModel gmo)
        {
            manager.client.Collection("gameInfo",
                                      (err, collection) => {  
                                          collection.Insert(gmo);
                                      });
        }
    }
    [Serializable]
    public class GameInfoModel
    {
        public int AnswerIndex { get; set; }
        public string GameName { get; set; }
    }
}