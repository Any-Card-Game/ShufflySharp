using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CodeMirrorLibrary;
using CommonLibraries;
using jQueryApi;
using jQueryApi.UI.Interactions;
using jQueryApi.UI.Widgets;

namespace Client.ShuffUI
{
    public class ShuffWindow : ShuffElement
    {
        internal jQueryObject Window { get { return Element; } set { Element = value; } }
        internal jQueryObject Outer
        {
            get { return outer; }
            set
            {
                outer = value;
                outer.Resizable(new ResizableOptions() { Handles = "n, e, s, w, ne, se, sw, nw" });
            }
        }

        [IntrinsicProperty]
        public dynamic Instance { get; set; }

        [IntrinsicProperty]
        public List<ShuffElement> Elements { get; set; }

        [IntrinsicProperty]
        public string Title { get; set; }

        [IntrinsicProperty]
        public int X { get; set; }

        [IntrinsicProperty]
        public int Y { get; set; }

        [IntrinsicProperty]
        public int Width { get; set; }

        [IntrinsicProperty]
        public bool AllowClose { get; set; }


        [IntrinsicProperty]
        public int Height { get; set; }

        [IntrinsicProperty]
        public bool AllowMinimize { get; set; }

        public jQueryObject outer;


        [IntrinsicProperty]
        public bool Static { get; set; }

        public ShuffWindow()
        {
            Elements = new List<ShuffElement>();

        }


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
            but.Inline().disableSelection();
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
            but.Inline().disableSelection();


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
            but.Inline().disableSelection();

            if (element.Label != null)
            {
                var lbl = jQuery.Select("<span style='" + element.LabelStyle + "'></span>");
                lbl.Text(element.Label);
                Window.Append(lbl);

                lbl.CSS("position", "absolute");
                lbl.CSS("left", element.X - lbl.GetWidth());
                lbl.CSS("top", element.Y + 2);
                lbl.Inline().disableSelection();
            }

            but.CSS("display", element.Visible == false ? "none" : "block");

            return but;

        }

        public jQueryObject AddCodeEditor(ShuffCodeEditor element)
        {
            

            Elements.Add(element);
            /*
             options = objMerge({ width: '100%', height: '100%' }, options);
        var divs = $('<div style="width:' + options.width + '; height:' + options.height + ';"> </div>');
        self.element.append(divs);

        divs.append('<textarea id="code" name="code" class="CodeMirror-fullscreen " style=""></textarea>');


        var codeMirror = document.getElementById("code");
        codeMirror.value = '';
        var editor = CodeMirror.fromTextArea(codeMirror, {
            lineNumbers: options.lineNumbers,
            lineWrapping: true,
            matchBrackets: true,
            onGutterClick: function (cm, n) {
                var info = cm.lineInfo(n);
                if (info.markerText) {
                    window.shuffUIManager.codeArea.breakPoints.splice(window.shuffUIManager.codeArea.breakPoints.indexOf(n-1), 0);
                    cm.clearMarker(n);
                } else {
                    window.shuffUIManager.codeArea.breakPoints.push(n-1);
                    cm.setMarker(n, "<span style=\"color: #900\">●</span> %N%");
                }
            },
            extraKeys: {
                "Ctrl-Space": function (cm) {
                    CodeMirror.simpleHint(cm, CodeMirror.javascriptHint);
                },
                "Ctrl-I": function (cm) {
                    var pos = cm.getCursor();
                    cm.setValue(window.fjs.format(cm.getValue()));
                    cm.setCursor(pos);

                }
            },

            onCursorActivity: function () {
                editor.setLineClass(hlLine, null);
                hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
            },
            onFocus: function (editor) {

            },
            onBlur: function (editor) {
            }
        });

        var hlLine = editor.setLineClass(0, "activeline");

        var scroller = editor.getScrollerElement();
        scroller.style.height = divs[0].offsetHeight + "px";
        scroller.style.width = divs[0].offsetWidth + "px";
        editor.refresh();
        editor.setOption("theme", "night");
        /*(function (outer, scroller) {

            outer.resizable({
                handles: "n, e, s, w, ne, se, sw, nw",
                resize: function () {
                    scroller.style.height = divs[0].offsetHeight + "px";
                    scroller.style.width = divs[0].offsetWidth + "px";

                }
            });
        })(self.outer,scroller);* /

        editor.codeElement = codeMirror;
        return editor;*/
            return null;
        }

        public jQueryObject AddListBox(ShuffTextBox element)
        {

            Elements.Add(element);


            var but = jQuery.Select("<div></div>");
            element.Element = but;
            Window.Append(but);
            but.Text(element.Text);
            but.CSS("position", "absolute");
            but.CSS("left", element.X + "px");
            but.CSS("top", element.Y + "px");

            var theme = "getTheme()".Inline();
            return but;
        }

    }
}