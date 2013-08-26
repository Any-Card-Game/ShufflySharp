#define FTP
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Renci.SshNet;

namespace Build
{
    internal class Program
    {
        private static string ReplaceWebIP = "http://content.anycardgame.com/";
#if !FTP
        private static string WebIP = "http://localhost:8881/";
#else
        private static string WebIP = "http://content.anycardgame.com/";
#endif
        private static void Main(string[] args)
        {
            string shufSharp = "ShufflySharp";

            var projs = new[] {
                                      shufSharp + @"\Libraries\CommonLibraries\",
                                      shufSharp + @"\Libraries\CommonShuffleLibrary\",
                                      shufSharp + @"\Libraries\WebLibraries\",
                                      shufSharp + @"\Libraries\ShuffleGameLibrary\",
                                      shufSharp + @"\Libraries\NodeLibraries\",
                                      shufSharp + @"\Servers\ServerManager\",
                                      shufSharp + @"\DataModels\",
                                      shufSharp + @"\Models\",
                                      shufSharp + @"\Client\",
                                      shufSharp + @"\ClientLibs\",
                                      shufSharp + @"\ServerSlammer\",
                              };
            var pre = Directory.GetCurrentDirectory() + @"\..\..\..\..\..\";
            string to;
            string from;
            foreach (var proj in projs)
            {
#if DEBUG
                from = pre + proj + @"\bin\debug\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#else
                var from = pre + proj + @"\bin\release\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#endif
                to = pre + shufSharp + @"\output\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";

                tryCopy(from, to);
            }


            tryCopyHtml(pre + shufSharp + @"\Client\index.html", pre + shufSharp + @"\output\index.html");
            tryCopyHtml(pre + shufSharp + @"\Client\site.css", pre + shufSharp + @"\output\site.css");
            tryCopyHtmlDir(pre + shufSharp + @"\Client\partials\", pre + shufSharp + @"\output\partials\");
            tryCopyHtmlDir(pre + shufSharp + @"\Client\partials\UIs\", pre + shufSharp + @"\output\partials\UIs\");


            tryCopyHtml(pre + shufSharp + @"\Client\index.html", @"C:\code\node\index.html");
            tryCopyHtml(pre + shufSharp + @"\Client\site.css", @"C:\code\node\site.css");/*
            tryCopyHtmlDir(pre + shufSharp + @"\Client\partials\", @"C:\code\node\partials\");
            tryCopyHtmlDir(pre + shufSharp + @"\Client\partials\UIs\", @"C:\code\node\partials\UIs\");
*/


            //client happens in buildsite.cs
            var depends = new Dictionary<string, Application>();
            depends.Add(shufSharp + @"\Servers\ServerManager\", new Application(true, @"./NodeLibraries.js", @"./CommonLibraries.js", @"./CommonShuffleLibrary.js", @"./ShuffleGameLibrary.js", @"./Models.js", @"./DataModels.js", @"./RawDeflate.js"));
            depends.Add(shufSharp + @"\Libraries\CommonShuffleLibrary\", new Application(false, @"./NodeLibraries.js"));
            depends.Add(shufSharp + @"\Libraries\NodeLibraries\", new Application(true));
            depends.Add(shufSharp + @"\Libraries\CommonLibraries\", new Application(false));
            depends.Add(shufSharp + @"\Libraries\WebLibraries\", new Application(false));
            depends.Add(shufSharp + @"\ClientLibs\", new Application(false));
            depends.Add(shufSharp + @"\ServerSlammer\", new Application(true, @"./NodeLibraries.js", @"./Models.js", @"./ClientLibs.js"));
            depends.Add(shufSharp + @"\Models\", new Application(false));
            depends.Add(shufSharp + @"\DataModels\", new Application(false));
            depends.Add(shufSharp + @"\Libraries\ShuffleGameLibrary\", new Application(false));
            depends.Add(shufSharp + @"\Client\", new Application(false));

#if FTP
            Console.WriteLine("connecting ftp");
            /*   Ftp webftp = new Ftp();
            webftp.Connect(ConfigurationSettings.AppSettings["web-ftpurl"]);
            webftp.Login(ConfigurationSettings.AppSettings["web-ftpusername"], ConfigurationSettings.AppSettings["web-ftppassword"]);

            Console.WriteLine("connected");

            webftp.Progress += (e, c) =>
            {
                var left = Console.CursorLeft;
                var top = Console.CursorTop;

                Console.SetCursorPosition(65, 5);
                Console.Write("|");

                for (int i = 0; i < c.Percentage / 10; i++)
                {
                    Console.Write("=");
                }
                for (int i = (int)(c.Percentage / 10); i < 10; i++)
                {
                    Console.Write("-");
                }
                Console.Write("|");

                Console.Write(c.Percentage + "  %  ");
                Console.WriteLine();
                Console.SetCursorPosition(left, top);
            };
*/
            string serverloc = ConfigurationSettings.AppSettings["server-ftpdir"];
            string serverloc2 = ConfigurationSettings.AppSettings["server-web-ftpdir"];
            Console.WriteLine("connecting server ftp");
            SftpClient client = new SftpClient(ConfigurationSettings.AppSettings["server-ftpurl"], ConfigurationSettings.AppSettings["server-ftpusername"], ConfigurationSettings.AppSettings["server-ftppassword"]);
            client.Connect();

            Console.WriteLine("server connected");

            Console.WriteLine("connecting web ftp");
            SftpClient webclient = new SftpClient(ConfigurationSettings.AppSettings["web-ftpurl"], ConfigurationSettings.AppSettings["server-ftpusername"], ConfigurationSettings.AppSettings["server-ftppassword"]);
            webclient.Connect();

            Console.WriteLine("server connected");

#endif

            FileStream fileStream;
            foreach (var depend in depends)
            {
                to = pre + shufSharp + @"\output\" + depend.Key.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var output = "";

                Application application = depend.Value;

                if (application.Node)
                {
                    output += "require('./mscorlib.js');";
                    output += "EventEmitter= require('events').EventEmitter;";
                }
                else
                {
                    //output += "require('./mscorlib.debug.js');";
                }

                foreach (var depe in application.IncludesAfter)
                {
                    output += string.Format("require('{0}');", depe);
                }

                var lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                //      lines.Add(application.After);

                File.WriteAllLines(to, lines);
                var name = to.Split(new char[] { '\\' }, StringSplitOptions.RemoveEmptyEntries).Last();

#if FTP

                long length = new FileInfo(to).Length;
                /*       if (!webftp.FileExists(loc + name) || webftp.GetFileSize(loc + name) != length)
                {
                    Console.WriteLine("ftp start " + length.ToString("N0"));
                    webftp.Upload(loc + name, to);
                    Console.WriteLine("ftp complete " + to);
                }
*/
                if (true || !client.Exists(serverloc + name) || client.GetAttributes(serverloc + name).Size != length)
                {
                    Console.WriteLine("server ftp start " + length.ToString("N0"));
                    fileStream = new FileInfo(to).OpenRead();
                    client.UploadFile(fileStream, serverloc + name, true);
                    fileStream.Close();
                    Console.WriteLine("server ftp complete " + to);
                }
                if (true || !client.Exists(serverloc2 + name) || client.GetAttributes(serverloc2 + name).Size != length)
                {
                    Console.WriteLine("server ftp start " + length.ToString("N0"));
                    fileStream = new FileInfo(to).OpenRead();
                    webclient.UploadFile(fileStream, serverloc2 + name, true);
                    fileStream.Close();
                    Console.WriteLine("server ftp complete " + to);
                }
#endif
                tryCopy(to, @"C:\code\node\" + name);
            }
#if FTP

            var send = pre + shufSharp + @"\output\index.html";

            Console.WriteLine("server ftp html start ");
            fileStream = new FileInfo(send).OpenRead();
            client.UploadFile(fileStream, serverloc + "index.html", true);
            fileStream.Close();
            Console.WriteLine("server ftp html complete " + send);

            Console.WriteLine("web ftp html start ");
            fileStream = new FileInfo(send).OpenRead();
            webclient.UploadFile(fileStream, serverloc2 + "index.html", true);
            fileStream.Close();
            Console.WriteLine("web ftp html complete " + send);


            send = pre + shufSharp + @"\output\site.css";

            Console.WriteLine("web ftp html start ");
            fileStream = new FileInfo(send).OpenRead();
            webclient.UploadFile(fileStream, serverloc2 + "site.css", true);
            fileStream.Close();
            Console.WriteLine("web ftp html complete " + send);


            send = pre + shufSharp + @"\output\monitor\monitor.js";

            Console.WriteLine("web ftp html start ");
            webclient.WriteAllText(serverloc2 + @"monitor/monitor.js", File.ReadAllText(send).Replace("http://localhost:8881/", WebIP).Replace("127.0.0.1:9991", "198.211.107.235:9991"));
            Console.WriteLine("web ftp html complete " + send);

            send = pre + shufSharp + @"\output\monitor\monitor.html";

            Console.WriteLine("web ftp html start ");
            webclient.WriteAllText(serverloc2 + @"monitor/monitor.html", File.ReadAllText(send).Replace("http://localhost:8881/", WebIP).Replace("127.0.0.1:9991", "198.211.107.235:9991"));
            Console.WriteLine("web ftp html complete " + send);




            foreach (var file in new DirectoryInfo(pre + shufSharp + @"\output\partials\").GetFiles())
            {
                fileStream = new FileInfo(file.FullName).OpenRead();
                webclient.UploadFile(fileStream, serverloc2 + "partials/" + file.Name, true);
                fileStream.Close();
                Console.WriteLine("web ftp html complete " + file.FullName);


            }

            foreach (var file in new DirectoryInfo(pre + shufSharp + @"\output\partials\UIs").GetFiles())
            {
                fileStream = new FileInfo(file.FullName).OpenRead();
                webclient.UploadFile(fileStream, serverloc2 + "partials/UIs/" + file.Name, true);
                fileStream.Close();
                Console.WriteLine("web ftp html complete " + file.FullName);

            }
#endif






            foreach (var d in Directory.GetDirectories(pre + shufSharp + @"\ShuffleGames\"))
            {
                string game = d.Split('\\').Last();
                to = pre + shufSharp + @"\output\Games\" + game;
                if (!Directory.Exists(to))

                    Directory.CreateDirectory(to);
                if (d.EndsWith("bin") || d.EndsWith("obj"))
                    continue;
                File.WriteAllText(to + @"\app.js", File.ReadAllText(d + @"\app.js"));

                if (!Directory.Exists(@"C:\code\node\games\" + game))
                    Directory.CreateDirectory(@"C:\code\node\games\" + game);
                File.WriteAllText(@"C:\code\node\games\" + game + @"\app.js", File.ReadAllText(to + @"\app.js"));

#if FTP

                Console.WriteLine("server ftp start ");

                fileStream = new FileInfo(to + @"\app.js").OpenRead();
                if (!client.Exists(serverloc + string.Format("Games/{0}", game)))
                    client.CreateDirectory(serverloc + string.Format("Games/{0}", game));
                client.UploadFile(fileStream, serverloc + string.Format("Games/{0}/app.js", game), true);
                fileStream.Close();

                Console.WriteLine("server ftp complete " + to);
#endif
            }

            Debug.WriteLine("Finished");
        }


        private static void tryCopy(string from, string to)
        {
        top:
            try
            {
                File.Copy(from, to, true);
            }
            catch (Exception)
            {
                Console.WriteLine("Copy Failed   " + from);
                goto top;
            }
        }
        private static void tryCopyHtmlDir(string from, string to)
        {
        top:
            try
            {

                foreach (var file in new DirectoryInfo(from).GetFiles())
                {
                    File.Copy(from + file.Name, to + file.Name, true);
                    File.WriteAllText(to + file.Name, File.ReadAllText(to + file.Name).Replace(ReplaceWebIP, WebIP));
                }
            }
            catch (Exception)
            {
                Console.WriteLine("Copy Failed   " + from);
                goto top;
            }
        }
        private static void tryCopyHtml(string from, string to)
        {
        top:
            try
            {


                File.Copy(from, to, true);
                File.WriteAllText(to, File.ReadAllText(to).Replace(ReplaceWebIP, WebIP));

            }
            catch (Exception)
            {
                Console.WriteLine("Copy Failed   " + from);
                goto top;
            }
        }

    }
    public class Application
    {
        public bool Node { get; set; }
        public string[] IncludesAfter { get; set; }

        public Application(bool node, params string[] includesAfter)
        {
            Node = node;
            IncludesAfter = includesAfter;
        }
    }

}