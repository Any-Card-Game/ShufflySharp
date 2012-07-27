using System;
using System.Runtime.CompilerServices;
using MongoDBLibrary;
using NodeJSLibrary;

namespace GameServer
{
    public class DataManager
    {
        public DataManagerGameData GameData;
        public MongoDB client;
        private MongoServer Server;
        private MongoConnection Connection;
        

        public DataManager()
        {
            GameData = new DataManagerGameData(this);
            Mongo mongo=Global.Require<Mongo>("mongodb");

            MongoDB Db = mongo.DB;
            Connection = mongo.Connection;
            MongoServer server=Server = mongo.Server;
            
            client = getMongo();
            client.Open(delegate
                            {
                                //client.Collection("test_insert", "test");
                            });

        }
        [InlineCode("new Db('test', new server('50.116.28.16', 27017, {}))")]
        private MongoDB getMongo()
        {
            return null;
        }
    }

    public class DataManagerGameData
    {
        private   DataManager manager;

        public DataManagerGameData(DataManager manager)
        {
            this.manager = manager;
        }

        public void Insert(string gameName, int answerIndex)
        {
            manager.client.Collection("gameInfo", delegate(string err, MongoCollection collection)
                                                      {
                                                          GameInfoObject gmo = new GameInfoObject();
                                                          gmo.GameName = gameName;
                                                          gmo.Answer= answerIndex;
                                                          collection.Insert(gmo);
                                                      });
        }
    }

    public class GameInfoObject
    {
        public string GameName;
        public int Answer;
    }
}