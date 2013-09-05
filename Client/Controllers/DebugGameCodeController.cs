using System.Collections.Generic;
using System.Html;
using Client.Scope.Controller;
using Client.Services;
using Models;
using Models.DebugGameManagerModels;
using Models.SiteManagerModels;
using WebLibraries.CodeMirror;

namespace Client.Controllers
{
    internal class DebugGameCodeController
    {
        public const string Name = "DebugGameCodeController";
        public const string View = "DebugGameCodeEditor";
        public static DebugGameCodeController Instance;
        private readonly ClientManagerService myClientManagerService;
        private readonly MessageService myMessageService;
        private readonly DebugGameCodeScope scope;

        public DebugGameCodeController(DebugGameCodeScope scope, ClientManagerService clientManagerService, MessageService messageService)
        {
            Instance = this;
            //scope.Model.
            this.scope = scope;
            myClientManagerService = clientManagerService;
            myMessageService = messageService;
            scope.Visible = true;
            scope.Model.Breakpoints = new List<int>();


            var extraKeys = new JsDictionary<string, string>();
            extraKeys["Ctrl-Space"] = "autocomplete";
            extraKeys["Ctrl-S"] = "save";

            scope.Model.CodeMirrorOptions = new CodeMirrorOptions()
                                            {
                                                LineNumbers = true,
                                                Theme = "midnight",
                                                Mode = "javascript",
                                                Gutters = new[] { "CodeMirror-linenumbers", "breakpoints" },
                                                OnGutterClick = (cm, n, gutter, evt) =>
                                                {
                                                    scope.Model.CodeMirror = cm;

                                                    var info = cm.LineInfo(n);
                                                    if (info.GutterMarkers != null && info.GutterMarkers["breakpoints"] != null)
                                                    {
                                                        scope.Model.Breakpoints.Remove(n + 1);
                                                        cm.SetGutterMarker(n, "breakpoints", null);

                                                    }
                                                    else
                                                    {
                                                        scope.Model.Breakpoints.Add(n+1);

                                                        cm.SetGutterMarker(n, "breakpoints", makeMarker());
                                                    }
                                                    if (scope.Model.Room != null)
                                                    {
                                                        clientManagerService.ClientDebugManagerService.DebugResponse(new DebugResponse(scope.Model.Room.RoomID, scope.Model.Breakpoints, StepType.Continue, false));
                                                    }
                                                },
                                                OnLoad = (editor) =>
                                                        {
                                                            scope.Model.CodeMirror = editor;
                                                        },
                                                ExtraKeys = extraKeys
                                            };

            clientManagerService.ClientDebugManagerService.OnGetDebugBreak += (user, debugBreak) =>
                                                                             {
                                                                                 
                                                                                 for (int i = 0; i < scope.Model.CodeMirror.LineCount(); i++)
                                                                                 {
                                                                                     scope.Model.CodeMirror.RemoveLineClass(i, "background", "codemirror-highlight-line");
                                                                                 }

                                                                                 scope.Model.CodeMirror.AddLineClass(debugBreak.LineNumber-1, "background", "codemirror-highlight-line");
                                                                                 scope.Model.CodeMirror.SetCursor(debugBreak.LineNumber-1, 0);

                                                                                 scope.Model.VariableLookupResult = debugBreak.VariableLookupResult;
                                                                                 scope.Apply();

                                                                             };


            scope.Model.StepInto = () =>
            {
                clientManagerService.ClientDebugManagerService.DebugResponse(new DebugResponse(scope.Model.Room.RoomID, scope.Model.Breakpoints, StepType.Into, true));
            };
            scope.Model.StepOver = () =>
            {
                clientManagerService.ClientDebugManagerService.DebugResponse(new DebugResponse(scope.Model.Room.RoomID, scope.Model.Breakpoints, StepType.Over, true));
            };
            scope.Model.Continue = () =>
            {
                clientManagerService.ClientDebugManagerService.DebugResponse(new DebugResponse(scope.Model.Room.RoomID, scope.Model.Breakpoints, StepType.Continue, true));

            };
            scope.Model.LookupVariable = () =>
            {
                clientManagerService.ClientDebugManagerService.DebugResponse(new DebugResponse(scope.Model.Room.RoomID, scope.Model.Breakpoints, StepType.Lookup, true) { VariableLookup = scope.Model.VariableLookup });
            };
            scope.watch("model.game.gameCode.code", () => { });

            this.scope.watch("model.game",
                () => { this.scope.Model.UpdateStatus = UpdateStatusType.Dirty; },
                true);


            scope.Model.ForceUpdate = false;
            scope.OnReady += () =>
                             {
                                 scope.Model.ForceUpdate = true;
                                 scope.Apply();
                             };

            myClientManagerService.ClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            this.scope.Model.UpdateStatus = UpdateStatusType.Synced;
            this.scope.Model.UpdateGame = UpdateGameFn;
        }

        private Element makeMarker()
        {
            var marker = Document.CreateElement("div");
            marker.InnerHTML = "o";
            marker.ClassName = "breakpoint";
            return marker;
        }

        public void Save()
        {
            UpdateGameFn();
        }

        private void OnDeveloperUpdateGameReceivedFn(UserModel user, DeveloperUpdateGameResponse o)
        {
            scope.Model.UpdateStatus = UpdateStatusType.Synced;
            scope.Apply();
        }

        private void UpdateGameFn()
        {
            scope.Model.UpdateStatus = UpdateStatusType.Syncing;

            myClientManagerService.ClientSiteManagerService.DeveloperUpdateGame(scope.Model.Game);
        }
    }
}

/*      Script.Eval("window.ACGIntellisense= $Client_Controllers_$GameCodeController.$build");
       public static IntellisenseReturn Build(CodeMirror editor,object options )
       {
           var val=editor.GetValue();
           var cur = editor.GetCursor();
           var token=editor.GetTokenAt(cur);
           switch (token.String)
           {
               case ".":
               case "=":
               case "+":
                   cur.Character++;
                   token=editor.GetTokenAt(cur);
                   break;
           }
           string oldVal = val;
           if (token.String.Trim() == "")
           {
               val=Splice(val, editor.IndexFromPos(cur), 0, "$$$");
               cur.Character++;
           }

           AST_Toplevel top;
           try
           {
               top = UglifyJS.Instance().Parse(val);
           }
           catch (Exception)
           {
               top = UglifyJS.Instance().Parse(oldVal);
           }
           top.FigureOutScope();
/*
           foreach (var astStatement in top.Body)
           {
               switch (astStatement.Type)
               {
                   case NodeType.SimpleStatement:
                       var m = (AST_SimpleStatement)astStatement;
                       var j = m.Body.Type;
                       Console.Log(j);
                       break;
               }
           }
#1#
           AST_Node goodNode = null;
           AST_Node alrightNode = null;
           top.Walk(new TreeWalker((node, descend) =>
           {
               if (goodNode != null)
               {
                   return true;
               }
               if (nodeContains(cur, node))
               {
                   goodNode = node;
                   return true;
               }
               if (nodeAfter(cur, node))
               {
                   alrightNode = node;
               }

               return false;
           }));
           if (goodNode == null)
           {
               goodNode = alrightNode;
           }

           Console.Log(goodNode);

           return new IntellisenseReturn(new List<string>() { "aa", "bb", "cc" }, Position.Make(cur.Line, token.Start), Position.Make(cur.Line, token.End));
       }

       public static string Splice(string str,int start, int leave, string piece)
       {
           return (str.Substring(0, start) + piece + str.Substring(start + Math.Abs(leave)));
       }

       private static bool nodeContains(CodeEditorCursor cur, AST_Node node)
       {
           if (node.Start.Line == cur.Line + 1 && node.End.Line == cur.Line + 1)
           {
               return (node.Start.Column <= cur.Character && node.End.Column + node.End.Value.Length > cur.Character);
           }
           return false;
       }
       private static bool nodeAfter(CodeEditorCursor cur, AST_Node node)
       {
           if (node.Start.Line >= cur.Line + 1 && (node.Start.Column >= cur.Character)) return true;
           return node.Start.Line >= cur.Line + 1;
       }
   [Serializable]
   public class IntellisenseReturn
   {
       public List<string> List { get; set; }
       public Position To { get; set; }
       public Position From { get; set; }
        
       [ObjectLiteral]
       public IntellisenseReturn(List<string> list, Position to, Position @from)
       {
           List = list;
           To = to;
           From = @from;
       }
   }
   [Imported]
   public class Position
   {
       [ScriptAlias("CodeMirror.Pos")]
       public static Position Make(int line, int start)
       {
           return null;
       }
   }*/