using System;
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
        [ScriptName("open")]
        public void Open(Action<object, object> action) {}

        [ScriptName("collection")]
        public void Collection(string testInsert, Action<string, MongoCollection> test) {}
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollection
    {
        [ScriptName("insert")]
        public void Insert(object gmo) {}
    }
}