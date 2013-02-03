using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace MongoDBLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollectionResult<T>
    {
        public void ToArray(Action<string, List<T>> result) {}
    }
}