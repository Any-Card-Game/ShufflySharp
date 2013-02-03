using System.Runtime.CompilerServices;
namespace global
{
    public enum TableSpaceResizeType
    {
        [ScriptName("grow")] Grow,
        [ScriptName("static")] Static
    }
}