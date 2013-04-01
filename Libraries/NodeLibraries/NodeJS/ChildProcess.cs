using System;
using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class ChildProcess : NodeModule
    {
        [IntrinsicProperty]
        public Func<string, Process> Exec { get; set; }
    }
}