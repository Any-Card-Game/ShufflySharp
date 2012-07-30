using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CodeMirrorLibrary;
using jQueryApi;
using jQueryApi.UI.Interactions;
using jQueryApi.UI.Widgets;

namespace Client.ShuffUI
{
    public class ShuffWindow<T> : ShuffElement
    {
        public jQueryObject outer;

        public ShuffWindow(T data)
        {
            Data = data;
            Elements = new List<ShuffElement>();
        }

        [IntrinsicProperty]
        public T Data { get; set; }

        internal jQueryObject Window
        {
            get { return Element; }
            set { Element = value; }
        }

        internal jQueryObject Outer
        {
            get { return outer; }
            set
            {
                outer = value;
                outer.Resizable(new ResizableOptions {Handles = "n, e, s, w, ne, se, sw, nw"});
            }
        }

        [IntrinsicProperty]
        public List<ShuffElement> Elements { get; set; }

        [IntrinsicProperty]
        public string Title { get; set; }

        [IntrinsicProperty]
        public bool AllowClose { get; set; }


        [IntrinsicProperty]
        public bool AllowMinimize { get; set; }


        [IntrinsicProperty]
        [PreserveName]
        public bool StaticPositioning { get; set; }


        public jQueryObject AddButton(ShuffButton element)
        {
            Elements.Add(element);


            var but = jQuery.Select("<div></div>");
            element.Element = but;
            Window.Append(but);
            but.Text(element.Text);
            but.CSS("position", "absolute");
            but.CSS("left", element.X + "px");
            but.CSS("top", element.Y + "px");
            but.CSS("width", element.Width + "px");
            but.CSS("height", element.Height + "px");

            but.Button();
            but.Click(element.Click);
            but.DisableSelection();
            but.CSS("display", element.Visible == false ? "none" : "block");

            return but;
        }

        public jQueryObject AddLabel(ShuffLabel element)
        {
            Elements.Add(element);


            var but = jQuery.Select("<span></span>");
            element.Element = but;
            Window.Append(but);
            but.Text(element.Text);
            but.CSS("position", "absolute");
            but.CSS("left", element.X + "px");
            but.CSS("top", element.Y + "px");
            but.DisableSelection();


            but.CSS("display", element.Visible == false ? "none" : "block");

            return but;
        }


        public jQueryObject AddTextbox(ShuffTextBox element)
        {
            Elements.Add(element);


            var but = jQuery.Select("<input value='" + (element.Text ?? "") + "' />");
            element.Element = but;
            Window.Append(but);
            but.Text(element.Text);
            but.CSS("position", "absolute");
            but.CSS("left", element.X + "px");
            but.CSS("top", element.Y + "px");
            but.CSS("width", element.Width + "px");
            but.CSS("height", element.Height + "px");
            but.DisableSelection();

            if (element.Label != null)
            {
                var lbl = jQuery.Select("<span style='" + element.LabelStyle + "'></span>");
                lbl.Text(element.Label);
                Window.Append(lbl);

                lbl.CSS("position", "absolute");
                lbl.CSS("left", element.X - lbl.GetWidth());
                lbl.CSS("top", element.Y + 2);
                lbl.DisableSelection();
            }

            but.CSS("display", element.Visible == false ? "none" : "block");

            return but;
        }

        public CodeMirrorInformation AddCodeEditor(ShuffCodeEditor _editor)
        {
            //options = objMerge({ width: '100%', height: '100%' }, options);

            Elements.Add(_editor);

            var divs = jQuery.Select("<div style='width:" + _editor.Width + "; height:" + _editor.Height + "''> </div>");
            Window.Append(divs);

            divs.Append("<textarea id='code' name='code' class='CodeMirror-fullscreen ' style=''></textarea>");

            var codeMirror = new CodeMirrorInformation
                {
                    element = (TextAreaElement) Document.GetElementById("code")
                };

            codeMirror.element.Value = "";

            CodeMirrorLine hlLine = null;

            codeMirror.editor = CodeMirror.FromTextArea(codeMirror.element, new CodeMirrorOptions
                {
                    LineNumbers = _editor.LineNumbers,
                    LineWrapping = true,
                    MatchBrackets = true,
                    OnGutterClick = (cm, n, e) =>
                        {
                            var info = cm.LineInfo(n);
                            if (info.MarkerText)
                            {
                                BuildSite.Instance.codeArea.Data.breakPoints.Extract(BuildSite.Instance.codeArea.Data.breakPoints.IndexOf(n - 1), 0);
                                cm.ClearMarker(n);
                            }
                            else
                            {
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

                    OnCursorActivity = (e) =>
                        {
                            codeMirror.editor.SetLineClass(hlLine, null);
                            hlLine = codeMirror.editor.SetLineClass(codeMirror.editor.GetCursor().Line, "activeline");
                        },
                    OnFocus = (e) => { },
                    OnBlur = (e) => { }
                });
            hlLine = codeMirror.editor.SetLineClass(0, "activeline");
            var scroller = codeMirror.editor.ScrollerElement;
            scroller.Style.Height = divs[0].OffsetHeight + "px";
            scroller.Style.Width = divs[0].OffsetWidth + "px";
            codeMirror.editor.Refresh();
            codeMirror.editor.SetOption("theme", "night");
            outer.Resizable(new ResizableOptions
                {
                    Handles = "n, e, s, w, ne, se, sw, nw",
                    OnResize = (e, c) =>
                        {
                            scroller.Style.Height = divs[0].OffsetHeight + "px";
                            scroller.Style.Width = divs[0].OffsetWidth + "px";
                        }
                });

            return codeMirror;
        }

        public jQueryObject AddListBox(ShuffListBox element)
        {
            Elements.Add(element);


            var but = jQuery.Select("<div></div>");
            element.Element = but;
            Window.Append(but);
            but.CSS("position", "absolute");
            but.CSS("left", element.X + "px");
            but.CSS("top", element.Y + "px");


            /* var theme = "getTheme()".me();
                     var theme = getTheme();
        but.jqxListBox({ source: options.items, width: options.width, height: options.height, theme: theme });
        but.bind('select', function (event) {
            var item = event.args.item;
            if (options.click)
                options.click(item);
        });
        return but;
             */
            return but;
        }

        public jQueryObject AddPropertyBox(ShuffPropertyBox shuffPropertyBox)
        {
            var but = jQuery.Select("<div></div>");
            Window.Append(but);
            but.CSS("position", "absolute");
            but.CSS("left", shuffPropertyBox.X);
            but.CSS("top", shuffPropertyBox.Y);
            but.CSS("width", shuffPropertyBox.Width);
            but.CSS("height", shuffPropertyBox.Height);
            but.CSS("overflow", "scroll");


            shuffPropertyBox.items = new List<ShuffListItem>();
            shuffPropertyBox.addItem = (ij) =>
                {
                    but.Append(shuffPropertyBox.ItemCreation(ij, shuffPropertyBox.items.Count));
                    shuffPropertyBox.items.Add(ij);
                };
            return but;
        }
    }
}