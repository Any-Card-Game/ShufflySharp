using System;
using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [Imported]
    [Serializable]
    public class SocketOptions
    {
        public int? Fd { get; set; }
        public SocketType? Type { get; set; }
        public bool? AllowHalfOpen { get; set; }
    }
}