using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [Imported]
    [ModuleName("http")]
    [IgnoreNamespace]
    public class Agent
    {
        private Agent() { }

        public int MaxSockets { get; set; }
    }
}