﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Build
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var projs = new[]
                {
                    @"ShuffleSharp\Libraries\CommonLibraries\",
                    @"ShuffleSharp\Libraries\CommonShuffleLibrary\",
                    @"ShuffleSharp\Libraries\ShuffleGameLibrary\",
                    @"ShuffleSharp\Servers\AdminServer\",
                    @"ShuffleSharp\Servers\ChatServer\",
                    @"ShuffleSharp\Servers\DebugServer\",
                    @"ShuffleSharp\Servers\GameServer\",
                    @"ShuffleSharp\Servers\GatewayServer\",
                    @"ShuffleSharp\Servers\HeadServer\",
                    @"ShuffleSharp\Servers\SiteServer\",
                    @"ShuffleSharp\Models\",
                    @"ShuffleSharp\Client\",
                };
            var pre = Directory.GetCurrentDirectory() + @"\..\..\..\..\..\";

            foreach (var proj in projs)
            {
#if DEBUG
                var from = pre + proj + @"\bin\debug\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#else
                var from = pre + proj + @"\bin\release\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#endif
                var to = pre + @"ShuffleSharp\output\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                if (File.Exists(to)) File.Delete(to);
                File.Copy(from, to);
            }

            var depends = new Dictionary<string, Application>
                {
                    {
                        @"ShuffleSharp\Servers\AdminServer\", new Application(true, "new AdminServer.AdminServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        @"ShuffleSharp\Servers\ChatServer\", new Application(true, "new ChatServer.ChatServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        @"ShuffleSharp\Servers\DebugServer\", new Application(true, "new DebugServer.DebugServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        @"ShuffleSharp\Servers\GameServer\", new Application(true, "new GameServer.GameServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./ShuffleGameLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        @"ShuffleSharp\Servers\GatewayServer\", new Application(true, "new GatewayServer.GatewayServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        @"ShuffleSharp\Servers\HeadServer\", new Application(true, "new HeadServer.HeadServer();", new List<string>
                            {
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {@"ShuffleSharp\Servers\SiteServer\", new Application(true, "", new List<string> {})},
                    {
                        @"ShuffleSharp\Client\", new Application(false, "", new List<string>
                            {
                            })
                    },
                };
            foreach (var depend in depends)
            {
                var to = pre + @"ShuffleSharp\output\" + depend.Key.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var output = "";

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
                    output += string.Format("require('{0}');", depe);
                }

                var lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                lines.Add(depend.Value.After);

                File.WriteAllLines(to, lines);
            }


            foreach (var d in Directory.GetDirectories(pre + @"ShuffleSharp\ShuffleGames\"))
            {
                var to = pre + @"ShuffleSharp\output\Games\" + d.Split('\\').Last();
                if (!Directory.Exists(to))

                    Directory.CreateDirectory(to);
                if (d.EndsWith("bin") || d.EndsWith("obj"))
                {
                    continue;
                }
                File.WriteAllText(to + @"\app.js", File.ReadAllText(d + @"\app.js"));
            }
        }

        #region Nested type: Application

        public class Application
        {
            public Application(bool node, string prepend, List<string> includesAfter)
            {
                After = prepend;
                Node = node;
                IncludesAfter = includesAfter;
            }

            public string After { get; set; }
            public bool Node { get; set; }
            public List<string> IncludesAfter { get; set; }
        }

        #endregion
    }
}