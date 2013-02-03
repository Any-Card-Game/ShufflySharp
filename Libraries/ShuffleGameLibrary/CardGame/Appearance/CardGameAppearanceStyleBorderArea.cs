using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("AppearanceStyleBorderArea")]
    public class CardGameAppearanceStyleBorderArea
    {
        [IntrinsicProperty]
        public string Color { get; set; }
        [IntrinsicProperty]
        public string Radius { get; set; }
        [IntrinsicProperty]
        public string Width { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceStyleBorderStyle Style { get; set; }

        public CardGameAppearanceStyleBorderArea()
        {
            Color = "#FFF";
            Radius = "0px";
            Width = "0px";
            Style = CardGameAppearanceStyleBorderStyle.None;
        }
    }
}