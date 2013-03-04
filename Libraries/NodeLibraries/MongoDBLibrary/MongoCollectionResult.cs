using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace MongoDBLibrary
{
    [IgnoreNamespace]
    [Imported]
    public class MongoCollectionResult<T>
    {
        public void ToArray(Action<string, List<T>> result) {}
    }
}