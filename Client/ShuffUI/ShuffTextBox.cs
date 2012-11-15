using System;
using System.Runtime.CompilerServices;
using jQueryApi;
namespace Client.ShuffUI
{
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
        protected jQueryObject LabelElement { get; set; }

        public ShuffTextbox(ShuffTextboxOptions options)
        {
            var but = jQuery.Select("<input value='" + ( options.Text ?? "" ) + "' />");
            Element = but;
            but.CSS("position", "absolute");
            Text = options.Text;
            X = options.X;
            Y = options.Y;
            Width = options.Width;
            Height = options.Height;
            Visible = options.Visible;

            but.Keydown(a => {
                            myText = but.GetText();
                            TextChanged(new TextChangedEvent(myText, true));
                        });

            if (options.Label != null) {
                ParentChanged += (e) => {
                                     if (e.Parent == null) {
                                         LabelElement.Remove();
                                         LabelElement = null;
                                     } else {
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

        public override void BindCustomEvents()
        {
            TextChanged += (e) => { if (!e.Live) Element.Value(e.Text); };
        }
    }
    public class ShuffTextbox<T> : ShuffTextbox
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public ShuffTextbox(ShuffTextboxOptions options, T data)
                : base(options)
        {
            Data = data;
        }
    }
}