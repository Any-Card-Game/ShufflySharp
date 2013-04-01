using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace NodeLibraries.MongoDB
{
    [IgnoreNamespace]
    [Imported]
    public class MongoCollection
    {
        public void Insert(object gmo)
        { 
        }

        
        public void Find<T>(object query, Action<string, MongoCollectionResult<T>> onFind) {}

        
        public void Save<T>(T item) {}

        public void Update(object query, JsDictionary<string, object> item, Action<string> callback = null) { }
        public void Update(object query, object item, Action<string> callback = null) { }

        
        public void Remove<T>(T item) {}

        public void Remove(object obj) {}
    }
}