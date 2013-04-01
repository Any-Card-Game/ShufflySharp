using System.Runtime.CompilerServices;
namespace NodeLibraries.Common.Charm
{
    [NamedValues]

    public enum DisplayType
    {
        [ScriptName("reset")]
        Reset,
        [ScriptName("bright")]
        Bright,
        [ScriptName("dim")]
        Dim,
        [ScriptName("underscore")]
        Underscore,
        [ScriptName("blink")]
        Blink,
        [ScriptName("reverse")]
        Reverse,
        [ScriptName("hidden")]
        Hidden
    }
}