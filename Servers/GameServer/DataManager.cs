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
            client.Open((arg1, arg2) =>
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

}