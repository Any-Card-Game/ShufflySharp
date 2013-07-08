using System;
using CommonLibraries;
using NodeLibraries.Common.Logging;
using NodeLibraries.NodeJS;
namespace ServerManager
{
    internal class ServerManager
    {
        public static void Main()
        {
            try {
                switch (Global.Process.Arguments[2].ToLower()) {
                    case "a":
                    case "admin":
                        new AdminServer.AdminServer();
                        break;
                    case "gw":
                    case "gateway":
                        new GatewayServer.GatewayServer();
                        break;
                    case "g":
                    case "game":
                        new GameServer.GameServer();
                        break;
                    case "d":
                    case "debug":
                        new DebugGameServer.DebugGameServer();
                        break;
                    case "c":
                    case "chat":
                        new ChatServer.ChatServer();
                        break;
                    case "h":
                    case "head":
                        new HeadServer.HeadServer();
                        break;
                    case "m":
                    case "monitor":
                        new MonitorServer.MonitorServer();
                        break;
                    case "s":
                    case "site":
                        new SiteServer.SiteServer();
                        break;
                    default:
                        Logger.Log("Failed to load: " + Global.Process.Arguments[2], LogLevel.Error);
                        break;
                }
            } catch (Exception exc) {
                Logger.Log("CRITICAL FAILURE: " + exc.GoodMessage(), LogLevel.Error);
            }
        }
    }
}