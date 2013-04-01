using System.Runtime.CompilerServices;
using NodeLibraries.NodeJS;
namespace ServerManager.AdminServer
{
    public class ProcessInformation
    {
        [IntrinsicProperty]
        public Process Process { get; set; }
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        [IntrinsicProperty]
        public int DebugPort { get; set; }

        public ProcessInformation(Process process, string name, int index, int debugPort)
        {
            Process = process;
            Name = name;
            Index = index;
            DebugPort = debugPort;
        }
    }
}