using System;
using CommonLibraries;
using CommonShuffleLibrary;
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
            ServerLogger.InitLogger("SiteServer", siteServerIndex);
            Logger.Start(siteServerIndex);


            Global.Process.On("exit", () => ServerLogger.Log("exi SiteServer",LogLevel.Information));

            SiteManager siteManager = new SiteManager(siteServerIndex);
        }

     }
}