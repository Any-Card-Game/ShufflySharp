using System;
using System.Collections;
using System.Collections.Generic;
using CommonLibraries;
using NodeJSLibrary;
namespace AdminServer
{
    public class AdminServer
    {
        private string __dirname;
        private List<ProcessInformation> chats;
        private bool debug;
        private List<ProcessInformation> debugs;
        private Func<string, Process> exec;
        private FS fs = Global.Require<FS>("fs");
        private List<ProcessInformation> games;
        private List<ProcessInformation> gateways;
        private ProcessInformation head;
        private int indexPageData = 0;
        private Process nodeInspector;
        private string[] nonDebuggable;
        private int numOfChatServers = 5;
        private int numOfGameServers = 5;
        private int numOfGateways = 5; 
        private int numOfSiteServers = 5;
        private List<ProcessInformation> sites;
        private Util util;

        public AdminServer()
        {
            var fs = Global.Require<FS>("fs");
            Console.Log("Shuffly Admin V0.48");
            Console.Log("Shuffly Admin V0.48");
            Console.Log("Shuffly Admin V0.48");
            Console.Log("Shuffly Admin V0.48");

            util = Global.Require<Util>("util");
            exec = Global.Require<ChildProcess>("child_process").Exec;
            __dirname = "/usr/local/src/new/";
            nonDebuggable = new[] {"node-inspector", "pkill"};

            Global.Require<Http>("http").CreateServer(handler).Listen(8090);

            debug = true;
            Global.SetInterval(() => { Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

            Global.Process.On("exit",
                              () => {
                                  Console.Log("Exiting ");
                                  onAsk("k");
                                  runProcess("pkill", new[] {"node"});
                              });

            if (debug)
                onAsk("d", true);
            onAsk("d", true);
            if (debug) {
                nodeInspector = runProcess("node-inspector", new string[0]);
                Console.Log("node-inspector Started");
            }

            onAsk("s");
        }

        public static void Main()
        {
            new AdminServer();
        }

        private void handler(HttpRequest request, HttpResponse response)
        {
            fs.ReadFile(__dirname + "/blank.html",
                        "ascii",
                        (err, content) => {
                            var fieldSets = "";
                            fieldSets += string.Format("<span>Main Site: {0}</span>", "<a href='#" + ( int.Parse(( Math.Random() * 20000 ).ToString()) ) + "' onclick='goHere(\"http://50.116.28.16\",\"MainSite\");'>Launch</a>");

                            fieldSets += buildFieldset(sites, "Site Servers");
                            fieldSets += buildFieldset(gateways, "Gateway Servers");
                            fieldSets += buildFieldset(games, "Game Servers");
                            fieldSets += buildFieldset(debugs, "Debug Servers");
                            fieldSets += buildFieldset(chats, "Chat Servers");

                            var dict = new JsDictionary();
                            dict["Content-Type"] = "text/html";
                            response.WriteHead(200, dict);
                            response.End(content.Replace("{0}", fieldSets));
                        });
        }

        private string buildFieldset(List<ProcessInformation> items, string name)
        {
            string str = "<fieldset>";
            str += "<ul style='list-style-type:none;'>";

            str += string.Format("<li >{0}</li>", name);
            str += string.Format("<li ></li>");

            foreach (var process in items) {
                str += "<li>";
                str += string.Format("<span>{0} ({1}): {2}</span>",
                                     process.Name,
                                     process.Index + 1,
                                     debug
                                             ? string.Format(
                                                     "<a href='#" + ( int.Parse(( Math.Random() * 20000 ).ToString()) ) + "' onclick='goHere(\"http://50.116.28.16:8080/debug?port={0}\",\"" + name + "(" + ( process.Index + 1 ) + ")" +
                                                     "\");'>Debug</a>",
                                                     process.DebugPort + "&foo=" + int.Parse(( Math.Random() * 5000000 ).ToString()))
                                             : "Debug");
                str += "</li>";

                //document.frames["test"].location.reload();
            }
            str += "</ul>";

            str += "</fieldset>";
            return str;
        }

        private void loop()
        {
            ask("?: ", "", a => onAsk(a));
        }

        private void onAsk(string data, bool ignore = false)
        {
            var rest = data.Substring(0, 2);
            switch (data.CharAt(0)) {
                case "d":

                    debug = !debug;
                    Console.Log("Debug " + ( debug ? "Enabled" : "Disabled" ));
                    break;
                case "s":

                    sites = new List<ProcessInformation>();
                    games = new List<ProcessInformation>();
                    chats = new List<ProcessInformation>();
                    debugs = new List<ProcessInformation>();
                    gateways = new List<ProcessInformation>();
                    head = new ProcessInformation(runProcess("node", new[] {__dirname + "HeadServer.js"}, 4000), "Head Server", 0, 4000);
                    Console.Log("Head Server Started");
                    for (var j = 0; j < numOfSiteServers; j++) {
                        sites.Add(new ProcessInformation(runProcess("node", new string[] {__dirname + "SiteServer.js"}, 4100 + j), "Site Server", j, 4100 + j));
                    }

                    Console.Log(sites.Count + " Site Servers Started");
                    for (var j = 0; j < numOfGateways; j++) {
                        gateways.Add(new ProcessInformation(runProcess("node", new[] {__dirname + "GatewayServer.js"}, 4400 + j), "Gateway Server", j, 4400 + j));
                    }
                    Console.Log(gateways.Count + " Gateway Servers Started");

                    for (var j = 0; j < numOfGameServers; j++) {
                        games.Add(new ProcessInformation(runProcess("node", new[] {__dirname + "GameServer.js"}, 4200 + j), "Game Server", j, 4200 + j));
                    }
                    Console.Log(games.Count + " Game Servers Started");

                    for (var j = 0; j < numOfChatServers; j++) {
                        chats.Add(new ProcessInformation(runProcess("node", new[] {__dirname + "ChatServer.js"}, 4500 + j), "Chat Server", j, 4500 + j));
                    }
                    Console.Log(chats.Count + " Chat Servers Started");

                    debugs.Add(new ProcessInformation(runProcess("node", new[] {__dirname + "DebugServer.js"}, 4300), "Debug Server", 0, 4300));
                    Console.Log(debugs.Count + " Debug Servers Started");

                    break;
                case "q":
                    Global.Process.Exit();
                    break;
            }

            if (!ignore)
                loop();
        }

        private void ask(string question, string format, Action<string> callback)
        {
            var stdin = Global.Process.STDIn;
            var stdout = Global.Process.STDOut;

            stdin.Resume();
            stdout.Write(question);

            stdin.Once("data",
                       (data) => {
                           data = data.ToString().Trim();
                           callback(data);
                       });
        }

        private Process runProcess(string process, string[] args, int debugPort = 0, string appArgs = null)
        {
            string[] al;
            var name = "";
            if (args.Length > 0)
                name = ( al = args[0].Split("/") )[al.Length - 1].Split(".")[0];
            if (nonDebuggable.IndexOf(process) == -1 && debug) {
                var jf = " --debug=";
                if (name.IndexOf("Gatewa-") > -1)
                    jf = " --debug-brk=";
                args[0] = jf + debugPort + " " + args[0];
            }
            var dummy = exec(process + " " + args.Join() + " " + ( appArgs ?? "" ));
            if (nonDebuggable.IndexOf(process) == -1) {
                dummy.STDOut.On<string>("data",
                                        (data) => {
                                            if (data.IndexOf("debug: ") == -1) {
                                                util.Print(string.Format("--{0}: {1}   {2}   {3}", name, debugPort, new DateTime().ToString().Substring(17, 24), data));
                                                util.Print("?: ");
                                            }
                                        });
                dummy.STDError.On<string>("data",
                                          (data) => {
                                              util.Print(string.Format("--{0}: {1}   {2}   {3}", name, debugPort, new DateTime().ToString().Substring(17, 24), data));
                                              util.Print("?: ");
                                          });
            }
            return dummy;
        }
    }
}