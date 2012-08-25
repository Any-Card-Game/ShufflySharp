using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using System.Text;
using CodeMirrorLibrary;
using CommonLibraries;
using jQueryApi;
using jQueryApi.UI.Interactions;
using jQueryApi.UI.Widgets;

namespace Client.ShuffUI
{
    public class ShuffWindow<T> : ShuffPanel
    {
        public jQueryObject outer;

        public ShuffWindow(T data)
            : base()
        {
            Data = data;
        }
        public ShuffWindow()
            : base()
        {
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
                outer.Resizable(new ResizableOptions { Handles = "n, e, s, w, ne, se, sw, nw" });
            }
        }

        [IntrinsicProperty]
        public string Title { get; set; }

        [IntrinsicProperty]
        public bool AllowClose { get; set; }

        [IntrinsicProperty]
        public bool AllowMinimize { get; set; }

        [IntrinsicProperty]
        public bool StaticPositioning { get; set; }

        [IntrinsicProperty]
        public UIAreaInformation Information { get; set; }


    }

    public class ShuffPanel : ShuffElement
    {
        public ShuffPanel()
        {
            Elements = new List<ShuffElement>();
            var but = jQuery.Select("<div />");
            Element = but;
            but.CSS("position", "absolute");
            but.CSS("width", "100%");
            but.CSS("height", "100%");
            but.CSS("top", "0");
            but.CSS("left", "0");
        }

        [IntrinsicProperty]
        public List<ShuffElement> Elements { get; set; }
        public T AddElement<T>(T element) where T : ShuffElement
        {

            Element.Append(element.Element);

            Elements.Add(element);
            element.ParentChanged(new ParentChangedEvent(this));
            return element;
        }
        public T RemoveElement<T>(T element) where T : ShuffElement
        {
            element.Element.Remove();

            Elements.Remove(element);
            element.ParentChanged(new ParentChangedEvent(null));
            return element;
        }
    }

    public delegate void ShuffUIEvent<T>(T t);

    [Serializable]
    public class PositionChangedEvent
    {
        public PositionChangedEvent(int x, int y)
        {
            X = x;
            Y = y;
        }

        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
    }

    [Serializable]
    public class ItemClickedEvent
    {
        public ShuffListItem Item { get; set; }

        public ItemClickedEvent(ShuffListItem item)
        {
            Item = item;
        }
    }
    [Serializable]
    public class SizeChangedEvent
    {
        public SizeChangedEvent(Number w, Number h)
        {
            Width = w;
            Height = h;
        }

        [IntrinsicProperty]
        public Number Width { get; set; }
        [IntrinsicProperty]
        public Number Height { get; set; }
    }
    [Serializable]
    public class VisibleChangedEvent
    {
        [IntrinsicProperty]
        public bool Visible { get; set; }

        public VisibleChangedEvent(bool visible)
        {
            Visible = visible;
        }
    }
    [Serializable]
    public class ButtonClickedEvent
    {


        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        public ButtonClickedEvent(int x, int y)
        {
            X = x;
            Y = y;
        }

    }
    [Serializable]
    public class TextChangedEvent
    {

        [IntrinsicProperty]
        public string Text { get; set; }

        [IntrinsicProperty]
        public bool Live { get; set; }
        public TextChangedEvent(string text, bool live)
        {
            Live = live;
            Text = text;
        }

    }
    [Serializable]
    public class ParentChangedEvent
    {
        public ParentChangedEvent(ShuffPanel parent)
        {
            Parent = parent;
        }
        [IntrinsicProperty]
        public ShuffPanel Parent { get; set; }
    }



    public class ShuffElement
    {
        private bool myVisible;
        private int myX;
        private int myY;
        private Number myWidth;
        private Number myHeight;


        public ShuffUIEvent<ParentChangedEvent> ParentChanged;
        public ShuffUIEvent<PositionChangedEvent> PositionChanged;
        public ShuffUIEvent<SizeChangedEvent> SizeChanged;
        public ShuffUIEvent<VisibleChangedEvent> VisibleChanged;

        public ShuffElement()
        {
            myWidth = 0;
            myHeight = 0;
            BindEvents();
        }

        public int X
        {
            get { return myX; }
            set
            {
                myX = value;
                PositionChanged(new PositionChangedEvent(myX, myY));
            }
        }
        public ShuffPanel Parent { get; set; }

        public int Y
        {
            get { return myY; }
            set
            {
                myY = value;
                PositionChanged(new PositionChangedEvent(myX, myY));
            }
        }

        public Number Width
        {
            get { return myWidth; }
            set
            {
                myWidth = value;
                SizeChanged(new SizeChangedEvent(myWidth, myHeight));
            }
        }


        public Number Height
        {
            get { return myHeight; }
            set
            {
                myHeight = value;
                SizeChanged(new SizeChangedEvent(myWidth, myHeight));
            }
        }

        [IntrinsicProperty]
        public jQueryObject Element { get; set; }

        public bool Visible
        {
            get { return myVisible; }
            set
            {
                myVisible = value;
                VisibleChanged(new VisibleChangedEvent(myVisible));

            }
        }
        internal void BindEvents()
        {

            SizeChanged += (e) =>
                               {
                                   if (((dynamic)e.Width))
                                       Element.CSS("width", e.Width + "px");
                                   if (((dynamic)e.Height))
                                       Element.CSS("height", e.Height + "px");
                               };

            PositionChanged += (e) =>
            {

                Element.CSS("left", e.X + "px");
                Element.CSS("top", e.Y + "px");
            };

            VisibleChanged += (e) => Element.CSS("display", e.Visible ? "block" : "none");

            ParentChanged += ((e) =>
                                  {
                                      Parent = e.Parent;

                                      if (Parent == null)
                                          Element.Remove();
                                      else
                                      {
                                          Parent.Element.Append(this.Element);
                                      }

                                  });
            BindCustomEvents();
        }

        public virtual void BindCustomEvents()
        {
        }
    }

    [Serializable]
    public class ShuffOptions
    {
        public bool Visible = true;

        public int X { get; set; }
        public int Y { get; set; }
        public Number Width { get; set; }
        public Number Height { get; set; }
    }


    [Serializable]
    public class ShuffTextboxOptions : ShuffOptions
    {
        public string Label { get; set; }
        public string LabelStyle { get; set; }

        [IntrinsicProperty]
        public string Text { get; set; }
    }


    public class ShuffTextbox : ShuffElement
    {

        private string myText;
        public string Text
        {
            get { return myText; }
            set
            {
                myText = value;
                TextChanged(new TextChangedEvent(myText, false));
            }
        }

        public ShuffUIEvent<TextChangedEvent> TextChanged { get; set; }

        public ShuffTextbox(ShuffTextboxOptions options)
        {

            var but = jQuery.Select("<input value='" + (options.Text ?? "") + "' />");
            Element = but;
            but.CSS("position", "absolute");
            Text = options.Text;
            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;

            but.Keydown(a =>
                            {
                                myText = but.GetText();
                                TextChanged(new TextChangedEvent(myText, true));
                            });

            if (options.Label != null)
            {
                ParentChanged += (e) =>
                                     {

                                         if (e.Parent == null)
                                         {
                                             LabelElement.Remove();
                                             LabelElement = null;
                                         }
                                         else
                                         {
                                             //to LabeledElement
                                             var lbl = jQuery.Select("<span style='" + options.LabelStyle + "'></span>");
                                             LabelElement = lbl;
                                             lbl.Text(options.Label);
                                             Parent.Element.Append(lbl);

                                             lbl.CSS("position", "absolute");
                                             lbl.CSS("left", X - lbl.GetWidth());
                                             lbl.CSS("top", Y + 2);
                                             lbl.DisableSelection();
                                         }

                                     };
            }

            but.DisableSelection();
        }

        protected jQueryObject LabelElement { get; set; }

        public override void BindCustomEvents()
        {
            TextChanged += (e) =>
                               {
                                   if (!e.Live) Element.Value(e.Text);
                               };

        }


    }
    public class ShuffTextbox<T> : ShuffTextbox
    {
        public ShuffTextbox(ShuffTextboxOptions options, T data)
            : base(options)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }



    [Serializable]
    public class ShuffLabelOptions : ShuffOptions
    {
        [IntrinsicProperty]
        public string Text { get; set; }
        public Number Width { get; set; }
        public Number Height { get; set; }
        public ShuffUIEvent<ButtonClickedEvent> OnClick { get; set; }
    }


    public class ShuffLabel : ShuffElement
    {
        private string myText;
        public string Text
        {
            get { return myText; }
            set
            {
                myText = value;
                TextChanged(new TextChangedEvent(myText, false));

            }
        }

        public ShuffUIEvent<TextChangedEvent> TextChanged { get; set; }

        public ShuffLabel(ShuffLabelOptions options)
        {

            var but = jQuery.Select("<span></span>");
            Element = but;
            but.CSS("position", "absolute");

            Text = options.Text;
            X = options.X;
            Y = options.Y;
            Visible = options.Visible;
            but.DisableSelection();
        }

        public override void BindCustomEvents()
        {
            TextChanged += (e) => Element.Text(e.Text);
        }


    }
    public class ShuffLabel<T> : ShuffLabel
    {
        public ShuffLabel(ShuffLabelOptions options, T data)
            : base(options)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }






    /*
    [Serializable]
    public class ShuffCodeEditorOptions : ShuffOptions
    {
        [IntrinsicProperty]
        public string Text { get; set; }
        public Number Width { get; set; }
        public Number Height { get; set; }
        public ShuffUIEvent<ButtonClickedEvent> OnClick { get; set; }
    }


    public class ShuffCodeEditor : ShuffElement
    {
        [IntrinsicProperty]
        public bool LineNumbers { get; set; } 

        public ShuffUIEvent<TextChangedEvent> TextChanged { get; set; }

        public ShuffCodeEditor(ShuffCodeEditorOptions options)
        {
            BindEvents();

            var but = jQuery.Select("<span></span>");
            Element = but;
            but.CSS("position", "absolute");
            Parent.Element.Append(but);

            Text = options.Text;
            X = options.X;
            Y = options.Y;
            Visible = options.Visible;
            but.DisableSelection();
        }

        public override void BindCustomEvents()
        {
            TextChanged += (e) => Element.Text(e.Text);
        }


    }
    public class ShuffCodeEditor<T> : ShuffCodeEditor
    {
        public ShuffCodeEditor(ShuffCodeEditorOptions options, T data)
            : base(options)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }


    */


    [Serializable]
    public class ShuffButtonOptions : ShuffOptions
    {
        public string Text { get; set; }

        public Number Width { get; set; }
        public Number Height { get; set; }
        public ShuffUIEvent<ButtonClickedEvent> OnClick { get; set; }

    }

    public class ShuffButton : ShuffElement
    {
        public ShuffUIEvent<TextChangedEvent> TextChanged { get; set; }

        public ShuffButton(ShuffButtonOptions options)
        {
            BindEvents();

            var but = jQuery.Select("<div></div>");
            Element = but;
            but.CSS("position", "absolute");

            Text = options.Text;
            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;

            but.Button();
            but.Click(a => options.OnClick(new ButtonClickedEvent(a.ClientX, a.ClientY)));

            but.DisableSelection();
        }

        public override void BindCustomEvents()
        {
            TextChanged += (e) => Element.Text(e.Text);
        }

        [IntrinsicProperty]
        public string Text { get; set; }
    }

    public class ShuffButton<T> : ShuffButton
    {
        public ShuffButton(ShuffButtonOptions options, T data)
            : base(options)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }

    [Serializable]
    public class ShuffCodeEditorOptions : ShuffOptions
    {
        public string Text { get; set; }


        public bool LineNumbers { get; set; }
    }

    public class ShuffCodeEditor : ShuffElement
    {
        public ShuffUIEvent<TextChangedEvent> TextChanged { get; set; }
        public CodeMirrorInformation Information;
        private CodeMirrorInformation codeMirror;

        [IntrinsicProperty]
        public string Text { get; set; }
        public ShuffCodeEditor(ShuffCodeEditorOptions options)
        {
            BindEvents();

            dynamic fmw = options.Width;
            dynamic fmh = options.Height;
            if (!fmw)
            {
                options.Width = "100%";
            }
            if (!fmh)
            {
                options.Height = "100%";
            }

  

            var divs = jQuery.Select("<div style='width:" + options.Width + "; height:" + options.Height + "'> </div>");

            var fm = jQuery.FromHtml("<textarea id='code' name='code' class='CodeMirror-fullscreen ' style=''></textarea>");
            divs.Append(fm);
            Element = divs;

            codeMirror = new CodeMirrorInformation
              {
                  element = (TextAreaElement)fm.GetElement(0)
              };

            codeMirror.element.Value = Text = options.Text;

            LineNumbers = options.LineNumbers;
            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;



        }

        public override void BindCustomEvents()
        {
            TextChanged += (e) => Element.Text(e.Text);
            ParentChanged += (ev) =>
                               {
                                   ExtensionMethods.debugger("");
                                   if (ev.Parent != null)
                                   {
                                       ev.Parent.Element.Append(Element);
                                       CodeMirrorLine hlLine = null;

                                       codeMirror.editor = CodeMirror.FromTextArea(codeMirror.element, new CodeMirrorOptions
                                       {
                                           LineNumbers = LineNumbers,
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
                                       scroller.Style.Height = Element[0].OffsetHeight + "px";
                                       scroller.Style.Width = Element[0].OffsetWidth + "px";
                                       codeMirror.editor.Refresh();
                                       codeMirror.editor.SetOption("theme", "night");


                                       this.Information = codeMirror;

                                   }
                                   else
                                   { 

                                   }







                               };
        }

        public ShuffCodeEditor()
        {
            Width = "100%";
            Height = "100%";
        }

        [IntrinsicProperty]
        public bool LineNumbers { get; set; }
    }

    public class ShuffCodeEditor<T> : ShuffCodeEditor
    {
        public ShuffCodeEditor(T data)
        {
            Data = data;
        }


        [IntrinsicProperty]
        public T Data { get; set; }
    }


    [Serializable]
    public class ShuffListBoxOptions : ShuffOptions
    {
        [IntrinsicProperty]
        public string Label { get; set; }
        [IntrinsicProperty]
        public List<ShuffListItem> Items { get; set; }
        [IntrinsicProperty]
        public ShuffUIEvent<ItemClickedEvent> OnClick { get; set; }
    }

    public class ShuffListBox : ShuffElement
    {
        [IntrinsicProperty]
        public string Label { get; set; }

        [IntrinsicProperty]
        public ShuffUIEvent<ItemClickedEvent> OnClick { get; set; }

        [IntrinsicProperty]
        public List<ShuffListItem> Items { get; set; }


        public ShuffListBox(ShuffListBoxOptions options)
        {
            BindEvents();

            var but = jQuery.Select("<div></div>");
            this.Element = but;

            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;






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

        }

        public override void BindCustomEvents()
        {
        }

    }

    public class ShuffListItem
    {
        public ShuffListItem(string label, int value)
        {
            Label = label;
            Value = value;
        }

        [IntrinsicProperty]
        public string Label { get; set; }

        [IntrinsicProperty]
        public int Value { get; set; }
    }

    public class ShuffListBox<T> : ShuffListBox
    {
        public ShuffListBox(ShuffListBoxOptions opts, T data)
            : base(opts)
        {
            Data = data;
        }

        [IntrinsicProperty]
        public T Data { get; set; }
    }


}
