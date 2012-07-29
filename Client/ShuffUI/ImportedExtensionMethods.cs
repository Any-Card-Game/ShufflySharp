using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{
    [Imported]
    [IgnoreNamespace]
    public static class ImportedExtensionMethods
    {
        [ScriptName("disableSelection")]
        [InstanceMethodOnFirstArgument]
        public static void DisableSelection(this jQueryObject obj)
        {

        }

    }
}