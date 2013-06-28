using System;
using System.Collections.Generic;
using CommonLibraries;
using NodeLibraries.NodeJS;
namespace NodeLibraries.Common.Logging
{
    public static class Common
    {
        public static string CurrentDate()
        {
            string sb = "";

            var dt = DateTime.Now;

            sb += dt.Day;
            sb += (dt.Month );
            sb += dt.Year;
            sb += dt.Hour;
            sb += dt.Minute;
            sb += dt.Second;
            return sb;
        }
    }
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

            
            Console.Log(key + " - " + Common.CurrentDate());
            Key = key + " - " + Common.CurrentDate() + ".txt";
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
            fs.AppendFile("logs/"+Key , item+"\n", null, (error, outp) =>
                                                         {
                                                             if (error != null)
                                                             {
                                                                 Console.Log(error);
                                                                 Console.Log(outp);
                                                             }
                                                         });
        }
    }
    public enum LogLevel { Error, DebugInformation, Information }
    public class ServerHelper
    {

        public static List<string> GetNetworkIPs( )
        {
            var os=Global.Require<dynamic>("os");

            var interfaces = ((JsDictionary<string,JsDictionary<string,string>>)os.networkInterfaces());
var addresses = new List<string>();
foreach (var k in interfaces) {
    
    foreach (var k2 in k.Value) {
        dynamic address = k2.Value;
        if (address.family == "IPv4" && !address.@internal) {
            addresses.Add(address.address);
        }
    }
}

            return addresses;

        }

 

    }

}