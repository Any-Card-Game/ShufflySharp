using System;
using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace NodeLibraries.MongoDB
{
    [IgnoreNamespace]
    [Imported]
    public class BSON : NodeModule
    {
        [IntrinsicProperty]
        [ScriptName("ObjectID")] 
        public Func<string, object> ObjectID { get; set; }
    }
}