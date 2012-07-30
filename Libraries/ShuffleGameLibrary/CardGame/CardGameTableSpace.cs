using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("TableSpace")]
    public class CardGameTableSpace
    {
        public CardGameTableSpace(CardGameTableSpaceOptions options)
        {
            Vertical = !options.Vertical ? false : options.Vertical;
            X = options.X == 0 ? 0 : options.X;
            Y = options.Y == 0 ? 0 : options.Y;
            Width = options.Width == 0 ? 0 : options.Width;
            Height = options.Height == 0 ? 0 : options.Height;
            Pile = options.Pile;
            Rotate = options.Rotate == 0 ? 0 : options.Rotate;
            Visible = !options.Visible ? true : options.Visible;
            StackCards = !options.StackCards ? false : options.StackCards;
            DrawCardsBent = !options.DrawCardsBent ? true : options.DrawCardsBent;
            Name = options.Name ?? "TableSpace";
            SortOrder = options.SortOrder;
            NumerOfCardsHorizontal = options.NumerOfCardsHorizontal == 0 ? 1 : options.NumerOfCardsHorizontal;
            NumerOfCardsVertical = options.NumerOfCardsVertical == 0 ? 1 : options.NumerOfCardsVertical;
            Effects = new List<CardGameEffect>();
        }

        [ScriptName("vertical")]
        [IntrinsicProperty]
        public bool Vertical { get; set; }

        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }

        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }

        [ScriptName("width")]
        [IntrinsicProperty]
        public double Width { get; set; }

        [ScriptName("height")]
        [IntrinsicProperty]
        public double Height { get; set; }

        [ScriptName("pile")]
        [IntrinsicProperty]
        public CardGamePile Pile { get; set; }

        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }

        [ScriptName("visible")]
        [IntrinsicProperty]
        public bool Visible { get; set; }

        [ScriptName("stackCards")]
        [IntrinsicProperty]
        public bool StackCards { get; set; }

        [ScriptName("drawCardsBent")]
        [IntrinsicProperty]
        public bool DrawCardsBent { get; set; }

        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }

        [ScriptName("sortPrder")]
        [IntrinsicProperty]
        public CardGameOrder SortOrder { get; set; }

        [ScriptName("numerOfCardsHorizontal")]
        [IntrinsicProperty]
        public int NumerOfCardsHorizontal { get; set; }

        [ScriptName("numerOfCardsVertical")]
        [IntrinsicProperty]
        public int NumerOfCardsVertical { get; set; }

        [ScriptName("effects")]
        [IntrinsicProperty]
        public List<CardGameEffect> Effects { get; set; }
    }
}