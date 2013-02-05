using System;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace MongoDBLibrary
{
    [Serializable]
    public class MongoDocument
    {
        public static Func<string, object> ObjectID { get; set; }
        static MongoDocument()
        {
            ObjectID = Global.Require<BSON>("bson").ObjectID;
        }


        [ScriptName("_id")]
        public string ID { get; set; }
        public static object GetID(string id)
        {
            if (id == null) {
                return null;
            }
            if (id .GetType()==typeof(string)) {
                return ObjectID(id);
            }
            return id;
        }
    }
}