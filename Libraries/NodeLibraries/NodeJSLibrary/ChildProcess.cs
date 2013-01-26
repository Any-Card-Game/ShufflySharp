using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class ChildProcess : NodeModule
    {
        [IntrinsicProperty]
        public Func<string, Process> Exec { get; set; }
    }
}