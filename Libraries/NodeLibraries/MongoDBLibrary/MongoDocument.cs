using System;
using System.Runtime.CompilerServices;
namespace MongoDBLibrary
{
    [Serializable]
    public class MongoDocument
    {
        [ScriptName("_id")]
        public string ID { get; set; }
    }
}