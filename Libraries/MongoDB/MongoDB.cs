 

using System;
using System.Html;
using System.Runtime.CompilerServices;
using NodeJSLibrary;

namespace MongoDBLibrary
{
    [IgnoreNamespace]
    [ScriptName("mongo")]
    public class Mongo : NodeModule
    {
        [ScriptName("Db")]
        public MongoDB DB;
        [ScriptName("Connection")]
        public MongoConnection Connection;
        [ScriptName("Server")]
        public MongoServer Server;
    }


    [IgnoreNamespace]
    public class MongoServer
    {
    }


    [IgnoreNamespace]
    public class MongoConnection
    {
    }

    [IgnoreNamespace]
    public class MongoDB : NodeModule
    {
        [ScriptName("open")]
        public void Open(Action<object, object> action)
        {
        }

        [ScriptName("collection")]
        public void Collection(string testInsert, Action<string,MongoCollection> test)
        {
        }
    }
    [IgnoreNamespace]
    public class MongoCollection
    {
        [ScriptName("insert")]
        public void Insert(object gmo)
        {
        }
    }
}
