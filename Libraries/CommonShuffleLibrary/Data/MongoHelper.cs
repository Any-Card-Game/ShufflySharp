using System;
using System.Collections.Generic;
using NodeLibraries.MongoDB;
namespace CommonShuffleLibrary.Data
{
    public static class MongoHelper
    {
        public static void Find<T>(MongoCollection collection, object query, Action<string, List<T>> result)  where T : MongoDocument
        {
            collection.Find<T>(query, (a, b) => b.ToArray((c, d) => result(a, d)));
        }
    }
}