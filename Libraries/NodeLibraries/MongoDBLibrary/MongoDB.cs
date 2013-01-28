using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace MongoDBLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("mongo")]
    public class Mongo : NodeModule
    {
        [ScriptName("Connection")]
        public MongoConnection Connection;
        [ScriptName("Db")]
        public MongoDB DB;
        [ScriptName("Server")]
        public MongoServer Server;
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoServer { }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoConnection { }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoDB : NodeModule
    {
        public void Open(Action<object, object> action) { }
        public void Collection(string collectionName, Action<string, MongoCollection> onConnect) { }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollection
    {
        public void Insert(object gmo) { }

        [IgnoreGenericArguments]
        public void Find<T>(JsDictionary<string, object> gmo, Action<string, MongoCollectionResult<T>> onFind) { }
    }

    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollectionResult<T>
    {
        public void ToArray (Action<string,List<T>> result)
        {

        }
    }

}