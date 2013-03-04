using System;
using CommonLibraries;
using CommonServerLibraries;
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
            Logger.Start(siteServerIndex);


            Global.Process.On("exit", () => Logger.Log("exi SiteServer",LogLevel.Information));

            SiteManager siteManager = new SiteManager(siteServerIndex);
        }

        public static void Main()
        {
            try {
                new SiteServer();
            } catch (Exception exc) {
                Logger.Log("CRITICAL FAILURE: " + exc.GoodMessage(),LogLevel.Error);
            }
        }
    }
}