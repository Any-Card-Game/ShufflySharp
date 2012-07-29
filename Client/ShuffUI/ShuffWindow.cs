using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CodeMirrorLibrary;
using CommonLibraries;
using jQueryApi;
using jQueryApi.UI.Interactions;
using jQueryApi.UI.Widgets;

namespace Client.ShuffUI
{
    public class ShuffWindow<T> : ShuffElement 
    {
        
        public T Data { get; set; }
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
        public List<ShuffElement> Elements { get; set; }

        [IntrinsicProperty]
        public string Title { get; set; } 

        [IntrinsicProperty]
        public bool AllowClose { get; set; }
         

        [IntrinsicProperty]
        public bool AllowMinimize { get; set; }

        public jQueryObject outer;


        [IntrinsicProperty]
        public bool Static { get; set; }

        public ShuffWindow(T data)
        {
            Data = data;  
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
            but.me().disableSelection();
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
            but.me().disableSelection();


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
            but.me().disableSelection();

            if (element.Label != null)
            {
                var lbl = jQuery.Select("<span style='" + element.LabelStyle + "'></span>");
                lbl.Text(element.Label);
                Window.Append(lbl);

                lbl.CSS("position", "absolute");
                lbl.CSS("left", element.X - lbl.GetWidth());
                lbl.CSS("top", element.Y + 2);
                lbl.me().disableSelection();
            }

            but.CSS("display", element.Visible == false ? "none" : "block");

            return but;

        }

        public CodeMirror AddCodeEditor(ShuffCodeEditor element)
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

            var theme = "getTheme()".me();
            /*
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


            but.me().items = new dynamic[0];
            but.me().addItem = (Action<dynamic>)((ij) =>
            {
                but.Append(shuffPropertyBox.ItemCreation(ij, but.me().items.length));
                but.me().items.push(ij);
            });
            return but;

        }

     }
}