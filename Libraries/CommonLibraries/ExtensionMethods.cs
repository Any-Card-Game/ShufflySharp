using System;
using System.Runtime.CompilerServices;
namespace CommonLibraries
{
    public static class ExtensionMethods
    {
        public const string HARDLOCATION = "/usr/local/src/new/";
//        public const string HARDLOCATION = @"c:\code\node\";
        [InlineCode("{script}")]
        public static dynamic me(this object script) //::dynamic okay
        {
            return script;
        }

        public static string GoodMessage(this Exception ex)
        {
            return ex.Message + "  " + ex.InnerException;
        }

        [InlineCode("debugger")]
        public static void debugger() { }
        
        [InlineCode("delete {m}")]
        public static void Delete(this object m) { }

        [InlineCode("eval({script})")]
        public static dynamic eval(this object script) //::dynamic okay
        {
            return null;
        }
        [InlineCode("{o}")]
        [InstanceMethodOnFirstArgument]
        public static T Cast<T>(this object o)
        {
            return default( T );
        }

        [InlineCode("{o}")]
        [InstanceMethodOnFirstArgument]
        public static T CastDynamic<T>(dynamic o)
        {
            return default( T );
        }

        public static T CleanUp<T>(T o)
        {
            return Json.Parse<T>(Json.Stringify(o, Help.Sanitize));
        }
    }
}