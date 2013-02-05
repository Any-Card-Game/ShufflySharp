using System;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace MongoDBLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoDB : NodeModule
    {
        public void Open(Action<object, object> action) { }
        public void Collection(string collectionName, Action<string, MongoCollection> onConnect) { }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class BSON : NodeModule
    {
        [IntrinsicProperty]
        [ScriptName("ObjectID")] 
        public Func<string, object> ObjectID { get; set; }
    }
}