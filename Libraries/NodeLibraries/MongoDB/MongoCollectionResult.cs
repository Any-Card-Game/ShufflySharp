using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace NodeLibraries.MongoDB
{
    [IgnoreNamespace]
    [Imported]
    public class MongoCollectionResult<T>
    {
        public void ToArray(Action<string, List<T>> result) {}
    }
}