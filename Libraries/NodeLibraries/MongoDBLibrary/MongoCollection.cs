using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace MongoDBLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollection
    {
        public void Insert(object gmo) {}

        [IgnoreGenericArguments]
        public void Find<T>(object query, Action<string, MongoCollectionResult<T>> onFind) {}

        [IgnoreGenericArguments]
        public void Save<T>(T item) {}

        public void Update(object query, JsDictionary<string, object> item, Action<string> callback = null) {}

        [IgnoreGenericArguments]
        public void Remove<T>(T item) {}

        public void Remove(object obj) {}
    }
}