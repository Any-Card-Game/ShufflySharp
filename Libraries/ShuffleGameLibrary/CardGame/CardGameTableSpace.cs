using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;

namespace global
{
    [ScriptName("TableSpace")]
    public class CardGameTableSpace
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
        public List<string> Effects { get; set; }
        [IntrinsicProperty]
        public bool Visible { get; set; }
        [IntrinsicProperty]
        public bool StackCards { get; set; } 
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public CardGameOrder SortOrder { get; set; }
        [IntrinsicProperty]
        public int NumberOfCardsHorizontal { get; set; }
        [IntrinsicProperty]
        public int NumberOfCardsVertical { get; set; }
        [IntrinsicProperty]
        public TableSpaceResizeType ResizeType { get; set; }

        public CardGameTableSpace(CardGameTableSpaceOptions options)
        {
            Vertical = !options.Vertical ? false : options.Vertical;
            X = options.X == 0 ? 0 : options.X;
            Y = options.Y == 0 ? 0 : options.Y;
            Name = options.Name ?? "TableSpace";
            Width = options.Width == 0 ? 0 : options.Width;
            Height = options.Height == 0 ? 0 : options.Height;
            //Rotate = options.Rotate == 0 ? 0 : options.Rotate;
            Visible = !options.Visible ? true : options.Visible;
            StackCards = !options.StackCards ? false : options.StackCards;
            Pile=new CardGamePile(Name+"Pile");
            SortOrder = options.SortOrder;
            NumberOfCardsHorizontal = options.NumerOfCardsHorizontal == 0 ? 1 : options.NumerOfCardsHorizontal;
            NumberOfCardsVertical = options.NumerOfCardsVertical == 0 ? 1 : options.NumerOfCardsVertical;
            ResizeType = options.ResizeType;
            //Rotate = ExtensionMethods.eval("options.rotate? options.rotate : 0");
            Effects=new List<string>();
        }

        public void ApplyPile(CardGamePile pile)
        {
            Pile = pile;
        }
    }
}