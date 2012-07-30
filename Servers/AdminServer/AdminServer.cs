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
        private bool debug;
        private FS fs = Global.Require<FS>("fs");


        private List<ProcessInformation> debugs;
        private Func<string, Process> exec;
        private List<ProcessInformation> games;
        private List<ProcessInformation> sites;
        private List<ProcessInformation> gateways;
        private ProcessInformation head;


        private int indexPageData = 0;
        private Process nodeInspector;
        private string[] nonDebuggable;

        private int numOfGameServers = 6;
        private int numOfGateways = 6;

        private Util util;

        public AdminServer()
        {
            var fs = Global.Require<FS>("fs");
            Console.Log("Shuffly Admin V0.41");

            util = Global.Require<Util>("util");
            exec = Global.Require<ChildProcess>("child_process").Exec;
            __dirname = "/usr/local/src/new/";
            nonDebuggable = new[] { "node-inspector", "pkill" };

            Global.Require<Http>("http").CreateServer(handler).Listen(8090);



            debug = false;
            Global.SetInterval(() => { Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

            nodeInspector = runProcess("node-inspector", new string[0]);
            Console.Log("node-inspector Started");
            Global.Process.On("exit", () =>
                {
                    Console.Log("Exiting ");
                    onAsk("k");
                    runProcess("pkill", new[] { "node" });
                });


            if (debug)
                onAsk("d", true);
            onAsk("d", true);
            onAsk("s");
        }

        private void handler(HttpRequest request, HttpResponse response)
        {

            fs.ReadFile(__dirname + "/blank.html", "ascii", (err,content)=>
                {

                    var fieldSets = "";
                    fieldSets += buildFieldset(sites);
                    fieldSets += buildFieldset(gateways);
                    fieldSets += buildFieldset(games);
                    fieldSets += buildFieldset(debugs);
                    fieldSets += buildFieldset(new List<ProcessInformation>(head));


                    string iframe = "<iframe width='100%' height='100%' src='http://50.116.22.241' id='mainContent'> </iframe>";
                    var rest = string.Format("<div style='height:100%;width:100%;'><table width='100%' height='100%'><tr height='100%'><td width='15%'>{0}</td><td>{1}</td><tr></table></div>", fieldSets, iframe);


                    var dict = new JsDictionary();
                    dict["Content-Type"] = "text/html";
                    response.WriteHead(200, dict);
                    response.End(content.Replace("{0}", rest));
                }); 

        }

        private string buildFieldset(List<ProcessInformation> items)
        {
            string str = "<fieldset>";
            str += "<ul>";
            foreach (var process in items)
            {
                str += "<li>";
                str += string.Format("<span>{0} ({1}): {2}</span>", process.Name, process.Index+1,
                                     debug ? string.Format("<a href='http://50.116.22.241:8080/debug?port={0}' target='_new'>Debug</a>", process.DebugPort) : "Debug");
                str += "</li>";

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
            switch (data.CharAt(0))
            {
                case "d":

                    debug = !debug;
                    Console.Log("Debug " + (debug ? "Enabled" : "Disabled"));
                    break;
                case "s":


                    sites = new List<ProcessInformation>();
                    games = new List<ProcessInformation>();
                    debugs = new List<ProcessInformation>();
                    gateways = new List<ProcessInformation>();
                    head = new ProcessInformation(runProcess("node", new[] { __dirname + "HeadServer.js" }, 4000),"Head Server",0,4000);
                    Console.Log("Head Server Started");

                    // sites.Add(runProcess("node", new string[] { __dirname + "siteServer/siteApp.js" }, 4100));
                    Console.Log(sites.Count + " Site Servers Started");
                    for (var j = 0; j < numOfGateways; j++)
                    {
                        gateways.Add(new ProcessInformation(runProcess("node", new[] { __dirname + "GatewayServer.js" }, 4400 + j),"Gateway Server",j,4400+j));
                    }
                    Console.Log(gateways.Count + " Gateway Servers Started");

                    for (var j = 0; j < numOfGameServers; j++)
                    {
                        games.Add(new ProcessInformation(runProcess("node", new[] { __dirname + "GameServer.js" }, 4200 + j),"Game Server",j, 4200+j));
                    }
                    Console.Log(games.Count + " Game Servers Started");

                    debugs.Add(new ProcessInformation(runProcess("node", new[] { __dirname + "DebugServer.js" }, 4300),"Debug Server",0,4300));
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

            stdin.Once("data", (data) =>
                {
                    data = data.ToString().Trim();
                    callback(data);
                });
        }

        private Process runProcess(string process, string[] args, int debugPort = 0, string appArgs = null)
        {
            string[] al;
            var name = "";
            if (args.Length > 0)
            {
                name = (al = args[0].Split("/"))[al.Length - 1].Split(".")[0];
            }
            if (nonDebuggable.IndexOf(process) == -1 && debug)
            {
                var jf = " --debug=";
                if (name.IndexOf("Gatewa-") > -1)
                {
                    jf = " --debug-brk=";
                }
                args[0] = jf + debugPort + " " + args[0];
            }
            var dummy = exec(process + " " + args.Join() + " " + (appArgs ?? ""));
            if (nonDebuggable.IndexOf(process) == -1)
            {
                dummy.STDOut.On<string>("data", (data) =>
                    {
                        if (data.IndexOf("debug: ") == -1)
                        {
                            util.Print("--" + name + "   " + new DateTime().ToString().Substring(17, 24) + "   " + data);
                            util.Print("?: ");
                        }
                    });
                dummy.STDError.On<string>("data", (data) =>
                    {
                        util.Print("--" + name + "   " + new DateTime().ToString().Substring(17, 24) + "   " + data);
                        util.Print("?: ");
                    });
            }
            return dummy;
        }
    }
}