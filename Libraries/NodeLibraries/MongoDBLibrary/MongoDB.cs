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
        [ScriptName("Connection")] public MongoConnection Connection;
        [ScriptName("Db")] public MongoDB DB;
        [ScriptName("Server")] public MongoServer Server;
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoServer {}
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoConnection {}
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoDB : NodeModule
    {
        public void Open(Action<object, object> action) {}
        public void Collection(string collectionName, Action<string, MongoCollection> onConnect) {}
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollection
    {
        public void Insert(object gmo) {}

        [IgnoreGenericArguments]
        public void Find<T>(object query, Action<string, MongoCollectionResult<T>> onFind) {}

        [IgnoreGenericArguments]
        public void Save<T>(T item) {}

        public void Update(object query, MongoUpdateStructure item, Action<string> callback = null) {}

        [IgnoreGenericArguments]
        public void Remove<T>(T item) {}

        public void Remove(object obj) {}
    }
    [Serializable]
    public class MongoUpdateStructure
    {
        [ScriptName("$push")]
        public object Push { get; set; }

        [ObjectLiteral]
        public MongoUpdateStructure(object push = null)
        {
            Push = push;
        }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollectionResult<T>
    {
        public void ToArray(Action<string, List<T>> result) {}
    }
    [Serializable]
    public class MongoDocument
    {
        [ScriptName("_id")]
        public string ID { get; set; }
    }
}