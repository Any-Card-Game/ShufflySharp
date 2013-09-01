using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using NodeLibraries.NodeJS;
namespace NodeLibraries.Common.Logging
{
    public static class Common
    {
        public static string ShortDate()
        {
            string sb = "";

            var dt = DateTime.Now;
            /*
                        sb += dt.Day;
                        sb += (dt.Month );
                        sb += dt.Year;*/
            sb += dt.Hour + ":";
            sb += dt.Minute + ":";
            sb += dt.Second;
            return sb;
        }
        public static string LongDate()
        {
            string sb = "";

            var dt = DateTime.Now;

            sb += dt.Day + "-";
            sb += dt.Month + "-";
            sb += dt.Year + "-";
            sb += dt.Hour + "-";
            sb += dt.Minute + "-";
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


            Console.WriteLine(key + " - " + Common.LongDate());
            Key = key + " - " + Common.LongDate() + ".txt";
            Log("Start: "+key, LogLevel.Information);
        }
        public static string Log(string item, LogLevel level)
        {
            item = string.Format("{0} - {1}", Common.ShortDate(), item);
            switch (level)
            {
                case LogLevel.Error:
                    Console.WriteLine(item);
                    break;
                case LogLevel.DebugInformation:
                    break;
                case LogLevel.Information:
                    break;
                case LogLevel.TransportInfo:
                    break;
                case LogLevel.DataInfo:
                    break;
                case LogLevel.KeepAlive:

                    return item;
            }
            fs.AppendFile("logs/" + Key, item + "\n", null, (error, outp) =>
                                                         {
                                                             if (error != null)
                                                             {
                                                                 Console.WriteLine(error.ToString());
                                                                 Console.WriteLine(outp);
                                                             }
                                                         });
            return item;
        }
    }

    [NamedValues]
    public enum LogLevel
    {
        Error,
        DebugInformation,
        Information,
        TransportInfo,
        DataInfo,
        KeepAlive
    }

    public class ServerHelper
    {

        public static List<string> GetNetworkIPs()
        {
            var os = Global.Require<dynamic>("os");

            var interfaces = ((JsDictionary<string, JsDictionary<string, string>>)os.networkInterfaces());
            var addresses = new List<string>();
            foreach (var k in interfaces)
            {

                foreach (var k2 in k.Value)
                {
                    dynamic address = k2.Value;
                    if (address.family == "IPv4" && !address.@internal)
                    {
                        addresses.Add(address.address);
                    }
                }
            }

            return addresses;

        }



    }

}