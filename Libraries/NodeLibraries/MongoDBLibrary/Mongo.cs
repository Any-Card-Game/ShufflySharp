using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace MongoDBLibrary
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("mongo")]
    public class Mongo : NodeModule
    {
        [ScriptName("Connection")] public MongoConnection Connection;
        [ScriptName("Db")] public MongoDB DB;
        [ScriptName("Server")] public MongoServer Server;
    }
}