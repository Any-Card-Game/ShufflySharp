using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
namespace global
{
    public class SpaceDrawing
    {
        [IntrinsicProperty]
        public InternalStyle OuterElementStyle { get; set; }
        [IntrinsicProperty]
        public Element OuterElement { get; set; }
        [IntrinsicProperty]
        public List<CardDrawing> ChildNodes { get; set; }

        public SpaceDrawing(Element item1)
        {
            OuterElement = item1;
            ChildNodes = new List<CardDrawing>();
            OuterElementStyle = new InternalStyle();
        }
    }
}