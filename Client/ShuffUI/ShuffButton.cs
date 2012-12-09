using System.Runtime.CompilerServices;
using jQueryApi;
using jQueryApi.UI.Widgets;
namespace Client.ShuffUI
{
    public class ShuffButton : ShuffElement
    {
        [IntrinsicProperty]
        public DelegateOrValue<string> Text { get; set; }

        public ShuffButton(int x, int y, Number width, Number height, DelegateOrValue<string> text, ShuffUIEvent<ButtonClickedEvent> click)
        {
            Element = jQuery.Select("<div></div>");
            Element.CSS("position", "absolute");

            Text = text;

            Text.StaticValueChanges += (value) => { Element.Text(value); };

            Element.Text(Text);
            X = x;
            Y = y;
            Width = width;
            Height = height;
            Visible = true;
            Element.Button();
            Element.Click(a => click(new ButtonClickedEvent(a.ClientX, a.ClientY)));

            Element.DisableSelection();
        }

        public override void BindCustomEvents() {}
    }
    public class ShuffButton<T> : ShuffButton
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public ShuffButton(T data, int x, int y, Number width, Number height, DelegateOrValue<string> text, ShuffUIEvent<ButtonClickedEvent> click)
                : base(x, y, width, height, text, click)
        {
            Data = data;
        }
    }
}