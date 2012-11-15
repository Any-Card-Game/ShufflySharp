using System.Collections.Generic;
using System.Runtime.CompilerServices;
using jQueryApi;
namespace Client.ShuffUI
{
    public class ShuffPanel : ShuffElement
    {
        [IntrinsicProperty]
        public List<ShuffElement> Elements { get; set; }

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
            Visible = true;
        }

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
}