using System.Runtime.CompilerServices;

namespace global
{
    [Record]
    public sealed class CardGameTableSpaceOptions
    {
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


        [ScriptName("resizeType")]
        [IntrinsicProperty]
        public string ResizeType { get; set; }//todo toenum
    }
}