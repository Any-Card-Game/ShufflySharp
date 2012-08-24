using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Build
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            string shufSharp = "ShufflySharp";

            var projs = new[]
                {
                    shufSharp+@"\Libraries\CommonLibraries\",
                    shufSharp+@"\Libraries\CommonShuffleLibrary\",
                    shufSharp+@"\Libraries\ShuffleGameLibrary\",
                    shufSharp+@"\Servers\AdminServer\",
                    shufSharp+@"\Servers\ChatServer\",
                    shufSharp+@"\Servers\DebugServer\",
                    shufSharp+@"\Servers\GameServer\",
                    shufSharp+@"\Servers\GatewayServer\",
                    shufSharp+@"\Servers\HeadServer\",
                    shufSharp+@"\Servers\SiteServer\",
                    shufSharp+@"\Models\",
                    shufSharp+@"\Client\",
                };
            var pre = Directory.GetCurrentDirectory() + @"\..\..\..\..\..\";

            foreach (var proj in projs)
            {
#if DEBUG
                var from = pre + proj + @"\bin\debug\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#else
                var from = pre + proj + @"\bin\release\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#endif
                var to = pre + shufSharp+@"\output\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                if (File.Exists(to)) File.Delete(to);
                File.Copy(from, to);
            }

            //client happens in buildsite.cs
            var depends = new Dictionary<string, Application>
                {
                    {
                        shufSharp+@"\Servers\AdminServer\", new Application(true, "new AdminServer.AdminServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        shufSharp+@"\Servers\ChatServer\", new Application(true, "new ChatServer.ChatServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        shufSharp+@"\Servers\DebugServer\", new Application(true, "new DebugServer.DebugServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        shufSharp+@"\Servers\GameServer\", new Application(true, "new GameServer.GameServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./ShuffleGameLibrary.js",
                                @"./Models.js",
                                @"./RawDeflate.js",
                            })
                    },
                    {
                        shufSharp+@"\Servers\GatewayServer\", new Application(true, "new GatewayServer.GatewayServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {
                        shufSharp+@"\Servers\HeadServer\", new Application(true, "new HeadServer.HeadServer();", new List<string>
                            {
                                @"./CommonShuffleLibrary.js",
                                @"./Models.js",
                            })
                    },
                    {shufSharp+@"\Servers\SiteServer\", new Application(true, "", new List<string> {})},
                    {
                        shufSharp+@"\Client\", new Application(false, "", new List<string>
                            {
                            })
                    },
                };
            foreach (var depend in depends)
            {
                var to = pre + shufSharp+@"\output\" + depend.Key.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var output = "";

                if (depend.Value.Node)
                {
                    output += "require('./mscorlib.debug.js');";
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


            foreach (var d in Directory.GetDirectories(pre + shufSharp+@"\ShuffleGames\"))
            {
                var to = pre + shufSharp+@"\output\Games\" + d.Split('\\').Last();
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