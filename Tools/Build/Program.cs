using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Build
{
    class Program
    {
        static void Main(string[] args)
        {

            string[] projs = new string[]
                {
                    @"ShuffleSharp\Libraries\CommonLibraries\",
                    @"ShuffleSharp\Libraries\CommonShuffleLibrary\",
                    @"ShuffleSharp\Servers\AdminServer\",
                    @"ShuffleSharp\Servers\ChatServer\",
                    @"ShuffleSharp\Servers\DebugServer\",
                    @"ShuffleSharp\Servers\GameServer\",
                    @"ShuffleSharp\Servers\GatewayServer\",
                    @"ShuffleSharp\Servers\HeadServer\",
                    @"ShuffleSharp\Servers\SiteServer\",
                };
            var pre = Directory.GetCurrentDirectory() + @"\..\..\..\..\..\";

            foreach (var proj in projs)
            {
                var from = pre + proj + @"\bin\debug\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var to = pre + @"ShuffleSharp\output\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                if(File.Exists(to))File.Delete(to);
                File.Copy(from, to);

            }

            var depends = new Dictionary<string, Tuple<string,List<string>>>
                {
                    {@"ShuffleSharp\Servers\AdminServer\", new Tuple<string, List<string>>("",new List<string>() {})},
                    {@"ShuffleSharp\Servers\ChatServer\", new Tuple<string, List<string>>("",new List<string>() {})},
                    {@"ShuffleSharp\Servers\DebugServer\", new Tuple<string, List<string>>("",new List<string>() {})},
                    {
                        @"ShuffleSharp\Servers\GameServer\",new Tuple<string, List<string>>("new GameServer.GameServer();",new List<string>() {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js", 
                            }) 
                    },
                    {@"ShuffleSharp\Servers\GatewayServer\", new Tuple<string, List<string>>("new GatewayServer.GatewayServer();",new List<string>() {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js", 
                            })},
                    {@"ShuffleSharp\Servers\HeadServer\", new Tuple<string, List<string>>("new HeadServer.HeadServer();",new List<string>() { 
                                @"./CommonShuffleLibrary.js", 
                            })},
                    {@"ShuffleSharp\Servers\SiteServer\", new Tuple<string, List<string>>("",new List<string>() {})},
                };
            foreach (var depend in depends)
            {
                var to = pre + @"ShuffleSharp\output\" + depend.Key.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                string output="";

                output += "require('./mscorlib.debug.js');";

                foreach (var depe in depend.Value.Item2)
                {
                    output+=string.Format("require('{0}');", depe);
                }

                List<string> lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                lines.Add(depend.Value.Item1);

                File.WriteAllLines(to, lines);
            }
        }
    }
}
