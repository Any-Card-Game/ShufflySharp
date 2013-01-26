using System.Runtime.CompilerServices;
namespace Client
{
    [IgnoreNamespace]
    public static class Globals
    {
        [IntrinsicProperty]
        [ScriptAlias("window")]
        public static dynamic Window { get; set; }
    }
}