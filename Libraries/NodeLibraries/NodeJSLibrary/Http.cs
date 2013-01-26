using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class Http : NodeModule
    {
        public Http() {}

        public HttpServer CreateServer(Action<HttpRequest, HttpResponse> callback)
        {
            return null;
        }
    }
}