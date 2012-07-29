using System;
using System.Collections.Generic;
using CommonLibraries;
using NodeJSLibrary;

namespace AdminServer
{
    public class AdminServer
    {
        private string __dirname;
        private bool debug;


        private List<Process> debugs;
        private Func<string, Process> exec;
        private List<Process> games;
        private List<Process> gateways;
        private Process head;
        private int indexPageData = 0;
        private Process nodeInspector;
        private string[] nonDebuggable;

        private int numOfGameServers = 1;
        private int numOfGateways = 1;
        private List<Process> sites;

        private Util util;

        public AdminServer()
        {
            var fs = Global.Require<FS>("fs");
            Console.Log("Shuffly Admin V0.41");

            util = Global.Require<Util>("util");
            exec = Global.Require<ChildProcess>("child_process").Exec;
            __dirname = "/usr/local/src/new/";
            nonDebuggable = new[] {"node-inspector", "pkill"};

            debug = false;
            Global.SetInterval(() => { Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10*1000);

            nodeInspector = runProcess("node-inspector", new string[0]);
            Console.Log("node-inspector Started");
            Global.Process.On("exit", () =>
                {
                    Console.Log("Exiting ");
                    onAsk("k");
                    runProcess("pkill", new[] {"node"});
                });


            if (debug)
                onAsk("d", true);
            onAsk("d", true);
            onAsk("s");
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


                    sites = new List<Process>();
                    games = new List<Process>();
                    debugs = new List<Process>();
                    gateways = new List<Process>();
                    head = runProcess("node", new[] {__dirname + "HeadServer.js"}, 4000);
                    Console.Log("Head Server Started");

                    // sites.Add(runProcess("node", new string[] { __dirname + "siteServer/siteApp.js" }, 4100));
                    Console.Log(sites.Count + " Site Servers Started");
                    for (var j = 0; j < numOfGateways; j++)
                    {
                        gateways.Add(runProcess("node", new[] {__dirname + "GatewayServer.js"}, 4400 + j));
                    }
                    Console.Log(gateways.Count + " Gateway Servers Started");

                    for (var j = 0; j < numOfGameServers; j++)
                    {
                        games.Add(runProcess("node", new[] {__dirname + "GameServer.js"}, 4200 + j));
                    }
                    Console.Log(games.Count + " Game Servers Started");

                    debugs.Add(runProcess("node", new[] {__dirname + "DebugServer.js"}, 4300));
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