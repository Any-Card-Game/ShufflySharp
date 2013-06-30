using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using Models;
using Models.SiteManagerModels;
using Models.SiteManagerModels.Game;
using WebLibraries.CodeMirror;
using WebLibraries.ShuffUI.ShuffUI;
using WebLibraries.UglifyJS;

namespace Client.Controllers
{
    internal class GameCodeController
    {
        
        private readonly GameCodeScope myScope;
        private readonly UIManagerService myUIManager;
        private readonly ClientSiteManagerService myClientSiteManagerService;
        private readonly MessageService myMessageService;

        public GameCodeController(GameCodeScope scope, UIManagerService uiManager, ClientSiteManagerService clientSiteManagerService, MessageService messageService)
        {
            //scope.Model.
            myScope = scope;
            myUIManager = uiManager;
            myClientSiteManagerService = clientSiteManagerService;
            myMessageService = messageService;
            scope.Visible = true;
            scope.watch("model.code", () =>
                                      {
                                       
                                      });
            Script.Eval("window.ACGIntellisense= $Client_Controllers_$GameCodeController.$build");
        }
        
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
*/
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
    }
}