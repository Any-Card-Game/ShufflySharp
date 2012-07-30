using System.Runtime.CompilerServices;
using NodeJSLibrary;

namespace AdminServer
{
    public class ProcessInformation 
    {
        public ProcessInformation(Process process, string name,int index, int debugPort)
        {
            Process = process;
            Name = name;
            Index = index;
            DebugPort = debugPort;
        }

        [IntrinsicProperty]
        public Process Process { get; set; }

        [IntrinsicProperty]
        public string Name { get; set; }

        [IntrinsicProperty]
        public int Index { get; set; }

        [IntrinsicProperty]
        public int DebugPort { get; set; }
    }
}