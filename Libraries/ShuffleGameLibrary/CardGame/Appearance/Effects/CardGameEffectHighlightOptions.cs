using System;
namespace global
{
    [Serializable]
    public class CardGameEffectHighlightOptions
    {
        public double Radius { get; set; }
        public string Color { get; set; }
        public double Rotate { get; set; }
        public double Opacity { get; set; }
        public double OffsetX { get; set; }
        public double OffsetY { get; set; }
    }
}