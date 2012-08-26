using System;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace Client.ShuffUI
{


    [Serializable]
    public class ShuffLabelOptions : ShuffOptions
    {
        [IntrinsicProperty]
        public string Text { get; set; }
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

}