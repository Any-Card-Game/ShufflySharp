using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace CommonLibraries
{
    public static class ExtensionMethods
    {
        [InlineCode("{script}")]
        public static dynamic me(this object script) //::dynamic okay
        {
            return script;
        }
        [InlineCode("debugger")]
        public static void debugger(this object script)
        {
        }

        [InlineCode("eval({script})")]
        public static dynamic eval(this object script) //::dynamic okay
        {
            return null;
        }
        [InlineCode("for(var item in {ar}){{ ")]
        public static dynamic ForInItem(this object ar) //::dynamic okay
        {

            return null;
        } 



        [InlineCode("{o}")]
        [InstanceMethodOnFirstArgument]
        public static T castValue<T>(this object o)
        {
            return default(T);
        }

        public static T CleanUp<T>(T o)
        {
            return Json.Parse<T>(Json.Stringify(o, Help.Sanitize));
        }

        [InlineCode("}}")]
        public static void CloseForIn()
        {
        }
    }
}