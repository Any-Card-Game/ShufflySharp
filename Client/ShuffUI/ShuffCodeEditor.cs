using System;
using System.Html;
using System.Runtime.CompilerServices;
using CodeMirrorLibrary;
using jQueryApi;
namespace Client.ShuffUI
{
    [Serializable]
    public class ShuffCodeEditorOptions : ShuffOptions
    {
        public string Text { get; set; }
        public bool LineNumbers { get; set; }
    }
    public class ShuffCodeEditor : ShuffElement
    {
        public CodeMirrorInformation Information;
        private CodeMirrorInformation codeMirror;
        public ShuffUIEvent<TextChangedEvent> TextChanged { get; set; }
        [IntrinsicProperty]
        public string Text { get; set; }
        [IntrinsicProperty]
        public bool LineNumbers { get; set; }

        public ShuffCodeEditor(ShuffCodeEditorOptions options)
        {
            dynamic fmw = options.Width;
            dynamic fmh = options.Height;
            if (!fmw)
                options.Width = "100%";
            if (!fmh)
                options.Height = "100%";

            var divs = jQuery.Select("<div style='width:" + options.Width + "; height:" + options.Height + "'> </div>");

            var fm = jQuery.FromHtml("<textarea id='code' name='code' class='CodeMirror-fullscreen ' style=''></textarea>");
            divs.Append(fm);
            Element = divs;

            codeMirror = new CodeMirrorInformation {
                                                           element = (TextAreaElement) fm.GetElement(0)
                                                   };

            codeMirror.element.Value = Text = options.Text;

            LineNumbers = options.LineNumbers;
            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;
        }

        public ShuffCodeEditor()
        {
            Width = "100%";
            Height = "100%";
        }

        public override void BindCustomEvents()
        {
            TextChanged += (e) => Element.Text(e.Text);
            ParentChanged += (ev) => {
                                 if (ev.Parent != null) {
                                     CodeMirrorLine hlLine = null;

                                     codeMirror.editor = CodeMirror.FromTextArea(codeMirror.element,
                                                                                 new CodeMirrorOptions {
                                                                                                               LineNumbers = LineNumbers,
                                                                                                               LineWrapping = true,
                                                                                                               MatchBrackets = true,
                                                                                                               OnGutterClick = (cm, n, e) => {
                                                                                                                                   var info = cm.LineInfo(n);
                                                                                                                                   if (info.MarkerText) {
                                                                                                                                       BuildSite.Instance.codeArea.Data.breakPoints.Extract(BuildSite.Instance.codeArea.Data.breakPoints.IndexOf(n - 1), 0);
                                                                                                                                       cm.ClearMarker(n);
                                                                                                                                   } else {
                                                                                                                                       BuildSite.Instance.codeArea.Data.breakPoints.Add(n - 1);
                                                                                                                                       cm.SetMarker(n, "<span style=\"color= #900\">●</span> %N%");
                                                                                                                                   }
                                                                                                                               },
                                                                                                               /*ExtraKeys= new JsDictionary<string,Action<dynamic>>()//::dynamic okay
                            {
                            "Ctrl-Space"= function (cm) {
                                CodeMirror.simpleHint(cm, CodeMirror.javascriptHint);
                            },
                            "Ctrl-I"= function (cm) {
                                var pos = cm.getCursor();
                                cm.setValue(window.fjs.format(cm.getValue()));
                                cm.setCursor(pos);

                            }
                        },*/

                                                                                                               OnCursorActivity = (e) => {
                                                                                                                                      codeMirror.editor.SetLineClass(hlLine, null);
                                                                                                                                      hlLine = codeMirror.editor.SetLineClass(codeMirror.editor.GetCursor().Line, "activeline");
                                                                                                                                  },
                                                                                                               OnFocus = (e) => { },
                                                                                                               OnBlur = (e) => { }
                                                                                                       });

                                     hlLine = codeMirror.editor.SetLineClass(0, "activeline");
                                     var scroller = codeMirror.editor.ScrollerElement;
                                     scroller.Style.Height = Element[0].OffsetHeight + "px";
                                     scroller.Style.Width = Element[0].OffsetWidth + "px";
                                     codeMirror.editor.Refresh();
                                     codeMirror.editor.SetOption("theme", "night");

                                     Information = codeMirror;
                                 } else {}
                             };
        }
    }
    public class ShuffCodeEditor<T> : ShuffCodeEditor
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public ShuffCodeEditor(T data)
        {
            Data = data;
        }
    }
}