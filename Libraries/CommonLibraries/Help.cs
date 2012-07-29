using System.Runtime.CompilerServices;
using System.Serialization;

namespace CommonLibraries
{
    public static class Help
    {
        public static T CleanUp<T>(this T o)
        {
            return Json.Parse<T>(Json.Stringify(o, Sanitize));
        }

        public static object Sanitize(string name, object value)
        {
            if (isFunction(value)) return null;
            if (name.IndexOf('_') != 0 && name.ToLowerCase() != "socket" && name.ToLowerCase() != "fiber" && name.ToLowerCase() != "debuggingsocket") return value;
            return null;
        }

        [InlineCode("typeof value == 'function'")]
        private static bool isFunction(object value)
        {
            return false;
        }
    }

    [Imported(IsRealType = true)]
    [IgnoreNamespace]
    [ScriptName("JSON")]
    public static class Json
    {
        public static object Parse(string json)
        {
            return null;
        }

        [IgnoreGenericArguments]
        public static T Parse<T>(string json)
        {
            return default(T);
        }

        [ScriptName("parse")]
        [IgnoreGenericArguments]
        public static TData ParseData<TData>(string json)
        {
            return default(TData);
        }

        public static object Parse(string json, JsonParseCallback parseCallback)
        {
            return null;
        }

        [ScriptName("parse")]
        [IgnoreGenericArguments]
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