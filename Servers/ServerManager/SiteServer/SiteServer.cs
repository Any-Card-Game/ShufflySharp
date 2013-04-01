using System;
using CommonLibraries;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
using global;
namespace ServerManager.SiteServer
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

     }
}