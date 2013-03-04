using System.Runtime.CompilerServices;
using System.Serialization;
namespace CommonLibraries
{
    [Imported]
    [IgnoreNamespace]
    [ScriptName("JSON")]
    public static class Json
    {
        public static object Parse(string json)
        {
            return null;
        }

        
        public static T Parse<T>(string json)
        {
            return default(T);
        }

        [ScriptName("parse")]
        
        public static TData ParseData<TData>(string json)
        {
            return default(TData);
        }

        public static object Parse(string json, JsonParseCallback parseCallback)
        {
            return null;
        }

        [ScriptName("parse")]
        
        public static TData ParseData<TData>(string json, JsonParseCallback parseCallback)
        {
            return default(TData);
        }

        public static string Stringify(object o)
        {
            return null;
        }

        public static string Stringify(object o, string[] serializableMembers)
        {
            return null;
        }

        public static string Stringify(object o, string[] serializableMembers, int indentSpaces)
        {
            return null;
        }

        public static string Stringify(object o, string[] serializableMembers, string indentText)
        {
            return null;
        }

        public static string Stringify(object o, JsonStringifyCallback callback)
        {
            return null;
        }

        public static string Stringify(object o, JsonStringifyCallback callback, int indentSpaces)
        {
            return null;
        }

        public static string Stringify(object o, JsonStringifyCallback callback, string indentText)
        {
            return null;
        }
    }
}



