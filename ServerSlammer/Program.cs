using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CommonLibraries;
using NodeJSLibrary;
namespace ServerSlammer
{
    class Program
    {
        static void Main( )
        {
            var http = Global.Require<Http>("http");
            http.Get("http://50.116.22.241:8844",
                     (r) => {
                         Console.Log(r.ToString());
                     });
        }
    }
}
