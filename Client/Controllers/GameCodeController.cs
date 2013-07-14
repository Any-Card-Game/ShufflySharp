using Client.Scope.Controller;
using Client.Services;
using Models;
using Models.SiteManagerModels;

namespace Client.Controllers
{
    internal class GameCodeController
    {
        public const string Name = "GameCodeController";
        public const string View = "GameCodeEditor";
        public static GameCodeController Instance;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly MessageService myMessageService;
        private readonly GameCodeScope myScope;

        public GameCodeController(GameCodeScope scope, 
            ClientSiteManagerService clientSiteManagerService, MessageService messageService)
        {
            Instance = this;
            //scope.Model.
            myScope = scope;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            scope.Visible = true;

            scope.watch("model.game.gameCode.code", () => { });

            myScope.watch("model.game",
                () => { myScope.Model.UpdateStatus = UpdateStatusType.Dirty; },
                true);

            scope.Model.ForceUpdate = false;
            scope.OnReady += () =>
                             {
                                 scope.Model.ForceUpdate = true;
                                 scope.Apply();
                             };

            myClientSiteManagerService.OnDeveloperUpdateGameReceived += OnDeveloperUpdateGameReceivedFn;
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Model.UpdateGame = UpdateGameFn;
        }

        public void Save()
        {
            UpdateGameFn();
        }

        private void OnDeveloperUpdateGameReceivedFn(UserModel user, DeveloperUpdateGameResponse o)
        {
            myScope.Model.UpdateStatus = UpdateStatusType.Synced;
            myScope.Apply();
        }

        private void UpdateGameFn()
        {
            myScope.Model.UpdateStatus = UpdateStatusType.Syncing;

            myClientSiteManagerService.DeveloperUpdateGame(myScope.Model.Game);
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