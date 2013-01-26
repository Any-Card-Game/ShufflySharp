using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class HttpResponse
    {
        public void End() {}
        public void WriteHead(int code, object httpResponseHeader) {}
        public void End(string s) {}
    }
}