using System;
using CommonLibraries;
using NodeJSLibrary;
using global;
namespace SiteServer
{
    public class SiteServer
    {
        private string siteServerIndex;

        public SiteServer()
        {


            new ArrayUtils(); 
            siteServerIndex = "SiteServer" + Guid.NewGuid();
            Global.Process.On("exit", () => Console.Log("exi SiteServer"));

            SiteManager siteManager = new SiteManager(siteServerIndex);

        }

        public static void Main()
        {
            try {
                new SiteServer();
            } catch (Exception exc) {
                Console.Log("CRITICAL FAILURE: " + exc.GoodMessage());
            }
        }
    }
}