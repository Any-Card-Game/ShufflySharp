using System;
using System.Runtime.CompilerServices;
using jQueryApi;
using jQueryApi.UI.Widgets;

namespace Client.ShuffUI
{


    [Serializable]
    public class ShuffButtonOptions : ShuffOptions
    {
        public string Text { get; set; }
        public ShuffUIEvent<ButtonClickedEvent> OnClick { get; set; }

    }

    public class ShuffButton : ShuffElement
    {
        public ShuffUIEvent<TextChangedEvent> TextChanged { get; set; }

        public ShuffButton(ShuffButtonOptions options)
        {

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
}