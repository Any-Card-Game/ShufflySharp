using System;
using CommonLibraries;
using NodeJSLibrary;
namespace CommonServerLibraries
{
    public static class Logger
    {
        private static FS fs;
        private static string Key;

        static Logger()
        {
            fs = Global.Require<FS>("fs");
        }
        public static void Start(string key)
        {
            Key = key + " - " + new DateTime().ToDateString() + "  " + new DateTime().ToTimeString() + ".txt";
        }
        public static void Log(string item,LogLevel level)
        {
            switch (level) {
                case LogLevel.Error:
                    Console.Log(item);
                    break;
                case LogLevel.DebugInformation:
                    Console.Log(item);
                    break;
                case LogLevel.Information:
                    break;
            }
            fs.AppendFile("logs/"+Key , item+"\n", null, null);
        }
    }
    public enum LogLevel { Error, DebugInformation, Information }
}