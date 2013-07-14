using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;

namespace global
{
    public class CardGameTableSpaceOptions
    {
        [IntrinsicProperty]
        public bool Vertical { get; set; }
        [IntrinsicProperty]
        public double X { get; set; }
        [IntrinsicProperty]
        public double Y { get; set; }
        [IntrinsicProperty]
        public double Width { get; set; }
        [IntrinsicProperty]
        public double Height { get; set; }
        [IntrinsicProperty]
        public CardGamePile Pile { get; set; }
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [IntrinsicProperty]
        public bool Visible { get; set; }
        [IntrinsicProperty]
        public bool StackCards { get; set; } 
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public CardGameOrder SortOrder { get; set; }
        [IntrinsicProperty]
        public int NumerOfCardsHorizontal { get; set; }
        [IntrinsicProperty]
        public int NumerOfCardsVertical { get; set; }
        [IntrinsicProperty]
        public TableSpaceResizeType ResizeType { get; set; }

        public CardGameTableSpaceOptions()
        {
            ResizeType = TableSpaceResizeType.Grow;
            Rotate = 0;
        }
    }
}