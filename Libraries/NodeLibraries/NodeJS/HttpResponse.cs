using System.Runtime.CompilerServices;
namespace NodeLibraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class HttpResponse
    {
        public void End() {}
        public void WriteHead(int code, object httpResponseHeader) {}
        public void End(string s) {}
    }
}