using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.MongoDB
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