using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using jQueryApi;
using jQueryApi.UI.Interactions;
using jQueryApi.UI.Widgets;

namespace Client.ShuffUI
{
    public class ShuffWindow<T> : ShuffPanel
    {
         public jQueryObject outer;

        public ShuffWindow(T data)
        {
            Data = data; 
        }
        public ShuffWindow ()
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
                outer.Resizable(new ResizableOptions {Handles = "n, e, s, w, ne, se, sw, nw"});
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
        }

        [IntrinsicProperty]
        public List<ShuffElement> Elements { get; set; }
        public T AddElement<T>(T element) where T : ShuffElement
        {
            Elements.Add(element);
            return element;
        }
        public T RemoveElement<T>(T element) where T: ShuffElement
        {
            Elements.Remove(element);
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



    public class ShuffElement
    {
        private bool myVisible;
        private int myX;
        private int myY;
        private Number myWidth;
        private Number myHeight;


        public ShuffUIEvent<PositionChangedEvent> PositionChanged;
        public ShuffUIEvent<SizeChangedEvent> SizeChanged;
        public ShuffUIEvent<VisibleChangedEvent> VisibleChanged;

        public ShuffElement()
        {
            myVisible = true;
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
            VisibleChanged += (e) => Element.CSS("display", e.Visible ? "block" : "none");
            SizeChanged += (e) =>
            {
                Element.CSS("width", e.Width + "px");
                Element.CSS("height", e.Height + "px");
            };

            PositionChanged += (e) =>
            {
                Element.CSS("left", e.X + "px");
                Element.CSS("top", e.Y + "px");
            };
            VisibleChanged += (e) => Element.CSS("display", e.Visible ? "block" : "none");
        }

        public virtual void BindCustomEvents()
        {
        }
    }

    [Serializable]
    public class ShuffOptions
    {
        public bool Visible { get; set; }
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
            BindEvents();
             
            var but = jQuery.Select("<input value='" + (options.Text ?? "") + "' />");
            Element = but;
            but.CSS("position", "absolute");
            Parent.Element.Append(but);
            Text = options.Text;
            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;

            but.Keydown(a =>
                            {
                                myText= but.GetText();
                                TextChanged(new TextChangedEvent(myText,true));
                            });

            if (options.Label != null)
            {
                //tolabel...

                var lbl = jQuery.Select("<span style='" + options.LabelStyle + "'></span>");
                lbl.Text(options.Label);
                Parent.Element.Append(lbl);

                lbl.CSS("position", "absolute");
                lbl.CSS("left", X - lbl.GetWidth());
                lbl.CSS("top", Y + 2);
                lbl.DisableSelection();
            }

            but.DisableSelection();
        }

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
            Parent.Element.Append(but);

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




}
