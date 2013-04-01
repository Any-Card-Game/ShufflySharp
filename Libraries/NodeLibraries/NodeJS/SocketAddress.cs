using System;
using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [Imported]
    [Serializable]
    public class SocketAddress
    {
        public int Port { get; set; }
        public string Family { get; set; }
        public string Address { get; set; }

        public SocketAddress(int port, string family, string address)
        {
        }
    }
}