using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
using NodeLibraries.Common.Logging;

namespace CommonShuffleLibrary
{
    public static class ServerLogger
    {
        private static PubSub pubsub;
        private static string ServerType;
        private static string ServerName;

        public static void InitLogger(string serverType, string serverName)
        {

            ServerName = serverName;
            ServerType = serverType;
            pubsub = new PubSub((ps) =>
                                {

                                });
        }

        public static void LogInformation(string item, object jsonContent=null)
        {
            Logger.Log(item, LogLevel.Information);
            pubsub.Publish(string.Format("PUBSUB.ServerLogger.{0}", ServerType), Json.Stringify(new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Information), Help.Sanitize));

        }
        public static void LogDebug(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.DebugInformation);
            pubsub.Publish(string.Format("PUBSUB.ServerLogger.{0}", ServerType), Json.Stringify(new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DebugInformation), Help.Sanitize));

        }
        public static void LogError(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.Error);
            pubsub.Publish(string.Format("PUBSUB.ServerLogger.{0}", ServerType), Json.Stringify(new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Error),Help.Sanitize));

        }
        public static void LogTransport(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.TransportInfo);
            pubsub.Publish(string.Format("PUBSUB.ServerLogger.{0}", ServerType), Json.Stringify(new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.TransportInfo), Help.Sanitize));

        }
        public static void LogData(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.DataInfo);
            pubsub.Publish(string.Format("PUBSUB.ServerLogger.{0}", ServerType), Json.Stringify(new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DataInfo), Help.Sanitize));

        }

    }
    public class ServerLogListener
    {
        private PubSub pubsub;
        private string ServerType;

        public ServerLogListener(string serverType, Action<ServerLogMessage> callback)
        {

            ServerType = serverType;
            pubsub =
                new PubSub(
                    (ps) =>
                        ps.Subscribe(string.Format("PUBSUB.ServerLogger.{0}", ServerType),
                            (content) => callback(Json.Parse<ServerLogMessage>(content))));
        }


    }
    [Serializable]
    public class ServerLogMessage
    {
        public DateTime Now { get; set; }
        public string ServerType { get; set; }
        public string ServerName { get; set; }
        public string Message { get; set; }
        public object Content { get; set; }
        public LogLevel LogLevel { get; set; }

        [ObjectLiteral]
        public ServerLogMessage(string serverType, string serverName, string message,object content, LogLevel logLevel)
        {
            ServerType = serverType;
            ServerName = serverName;
            Message = message;
            Content = content;
            LogLevel = logLevel;
            Now = DateTime.Now;
        }
    }
}