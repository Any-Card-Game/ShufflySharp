using System.Runtime.CompilerServices;
using jQueryApi;
namespace ShuffUI
{
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

        public ShuffLabel(int x, int y, string text)
        {
            var but = jQuery.Select("<span></span>");
            Element = but;
            but.CSS("position", "absolute");

            Text = text;
            X = x;
            Y = y;
            Visible = true;
            ImportedExtensionMethods.DisableSelection(but);
        }

        public override void BindCustomEvents()
        {
            TextChanged += (e) => Element.Text(e.Text);
        }
    }
    public class ShuffLabel<T> : ShuffLabel
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public ShuffLabel(T data, int x, int y, string text)
                : base(x, y, text)
        {
            Data = data;
        }
    }
}