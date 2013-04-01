using System.Runtime.CompilerServices;
namespace NodeLibraries.Common.Charm
{
    [NamedValues]

    public enum EraseType
    {
        [ScriptName("end")]
        End,
        [ScriptName("start")]
        Start,
        [ScriptName("line")]
        Line,
        [ScriptName("down")]
        Down,
        [ScriptName("Up")]
        Up,
        [ScriptName("screen")]
        Screen
    }
}