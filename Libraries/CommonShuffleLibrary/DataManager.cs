using System.Runtime.CompilerServices;
using CommonShuffleLibrary.Data;
using MongoDBLibrary;
using NodeJSLibrary;
namespace CommonShuffleLibrary
{
    public partial  class DataManager
    {
        private const string ConnectionAddress = "50.116.28.16";
        private const string ConnectionPort = "27017";

        private MongoConnection Connection;
        private MongoServer Server;
        public MongoDB client;

        public DataManager()
        {
            var mongo = Global.Require<Mongo>("mongodb");

            var Db = mongo.DB;
            Connection = mongo.Connection;
            var server = Server = mongo.Server;

            client = getMongo();
            client.Open((arg1, arg2) =>
            {
                //client.Collection("test_insert", "test");
            });

            InitData();
        }

        [InlineCode("new Db('test', new server('" + ConnectionAddress + "', " + ConnectionPort + ", {}))")]
        private MongoDB getMongo()
        {
            return null;
        }
    }

} /*


using System;
using System.Runtime.CompilerServices;
using MongoDBLibrary;
using NodeJSLibrary;

namespace GameServer
{
    public class DataManager
    {
        private MongoConnection Connection;
        public DataManagerGameData GameData;
        private MongoServer Server;
        public MongoDB client;


        public DataManager()
        {
            GameData = new DataManagerGameData(this);
            var mongo = Global.Require<MongoData>("mongodb");

            var Db = mongo.DB;
            Connection = mongo.Connection;
            var server = Server = mongo.Server;

            client = new Db('test', new server('50.116.28.16', 27017, {}));
            client.Open((arg1, arg2) =>
                {
                    //client.Collection("test_insert", "test");
                });
        }

        
    }

    public class MongoData:NodeModule
    {
        [IntrinsicProperty]
        public Func<string, MongoServer, Mongo> DB { get; set; }
        public MongoConnection Connection { get; set; }
        public MongoServer Server { get; set; }
    }
}*/