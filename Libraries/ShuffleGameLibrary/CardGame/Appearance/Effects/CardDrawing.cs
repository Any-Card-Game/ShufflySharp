using System.Html;
using System.Runtime.CompilerServices;
namespace global
{
    public class CardDrawing
    {
        [IntrinsicProperty]
        public Element OuterElement { get; set; }
        [IntrinsicProperty]
        public InternalStyle OuterElementStyle { get; set; }

        public CardDrawing(Element item1)
        {
            OuterElement = item1;
            OuterElementStyle = new InternalStyle();
        }
    }
}