using System;
using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.MongoDB
{
    [IgnoreNamespace]
    [Imported]
    public class MongoDB : NodeModule
    {
        public void Open(Action<object, object> action) { }
        public void Collection(string collectionName, Action<string, MongoCollection> onConnect) { }
    }
}