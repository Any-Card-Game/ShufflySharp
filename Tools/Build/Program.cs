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
                    @"ShuffleSharp\Libraries\NodeLibraries\CommonShuffleLibrary\",
                    @"ShuffleSharp\Servers\AdminServer\",
                    @"ShuffleSharp\Servers\ChatServer\",
                    @"ShuffleSharp\Servers\DebugServer\",
                    @"ShuffleSharp\Servers\GameServer\",
                    @"ShuffleSharp\Servers\GatewayServer\",
                    @"ShuffleSharp\Servers\HeadServer\",
                    @"ShuffleSharp\Servers\SiteServer\",
                    @"ShuffleSharp\Client\",
                };
            var pre = Directory.GetCurrentDirectory() + @"\..\..\..\..\..\";

            foreach (var proj in projs)
            {
                var from = pre + proj + @"\bin\debug\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var to = pre + @"ShuffleSharp\output\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                if(File.Exists(to))File.Delete(to);
                File.Copy(from, to);

            }

            var depends = new Dictionary<string, Application>
                {
                    {@"ShuffleSharp\Servers\AdminServer\", new Application(true,"",new List<string>() {})},
                    {@"ShuffleSharp\Servers\ChatServer\", new Application(true,"",new List<string>() {})},
                    {@"ShuffleSharp\Servers\DebugServer\", new Application(true,"",new List<string>() {})},
                    {
                        @"ShuffleSharp\Servers\GameServer\",new Application(true,"new GameServer.GameServer();",new List<string>() {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js", 
                            }) 
                    },
                    {@"ShuffleSharp\Servers\GatewayServer\", new Application(true,"new GatewayServer.GatewayServer();",new List<string>() {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js", 
                            })},
                    {@"ShuffleSharp\Servers\HeadServer\", new Application(true,"new HeadServer.HeadServer();",new List<string>() { 
                                @"./CommonShuffleLibrary.js", 
                            })},
                    {@"ShuffleSharp\Servers\SiteServer\", new Application(true,"",new List<string>() {})},
                    {@"ShuffleSharp\Client\", new Application(false,"",new List<string>() {})},
                };
            foreach (var depend in depends)
            {
                var to = pre + @"ShuffleSharp\output\" + depend.Key.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                string output="";

                if (depend.Value.Node)
                {
                    output += "require('./mscorlib.node.debug.js');";
                }
                else
                {
                    //output += "require('./mscorlib.debug.js');";
                }

                foreach (var depe in depend.Value.IncludesAfter)
                {
                    output+=string.Format("require('{0}');", depe);
                }

                List<string> lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                lines.Add(depend.Value.After);

                File.WriteAllLines(to, lines);
            }
        }
        public class Application
        {
            public Application(bool node, string prepend,List<string> includesAfter)
            {
                After = prepend;
                Node = node;
                IncludesAfter = includesAfter;
            }

            public string After { get; set; }
            public bool Node { get; set; }
            public List<string> IncludesAfter { get; set; }

        }
    }
}
