using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using jQueryApi.UI;

namespace Client
{
    public class CardGameAreaSpace
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
    }

    public class CardGamePile
    {
        [ScriptName("cards")]
        [IntrinsicProperty]
        public List<CardGameCard> Cards { get; set; }
    }

    public class CardGameCard
    {
        [ScriptName("value")]
        [IntrinsicProperty]
        public int Value { get; set; }
        [ScriptName("type")]
        [IntrinsicProperty]
        public int Type { get; set; }
        [ScriptName("effects")]
        [IntrinsicProperty]
        public List<CardGameEffect> Effects { get; set; }
    }

    public class CardGameEffect
    {
        [ScriptName("type")]
        [IntrinsicProperty]
        public string Type { get; set; }
        [ScriptName("radius")]
        [IntrinsicProperty]
        public double Radius { get; set; }
        [ScriptName("color")]
        [IntrinsicProperty]
        public string Color { get; set; }
        [ScriptName("rotate")]
        [IntrinsicProperty]
        public double Rotate { get; set; }
        [ScriptName("offsetX")]
        [IntrinsicProperty]
        public double OffsetX { get; set; }
        [ScriptName("offsetY")]
        [IntrinsicProperty]
        public double OffsetY { get; set; }

    }

    public enum EffectType
    { 
        Highlight
    }
    [Record]
    public sealed class CardGameArea
    {
        [ScriptName("size")]
        [IntrinsicProperty]
        public Size Size { get; set; }

        [ScriptName("spaces")]
        [IntrinsicProperty]
        public List<CardGameAreaSpace> Spaces { get; set; }

        [ScriptName("textAreas")]
        [IntrinsicProperty]
        public List<CardGameTextArea> TextAreas { get; set; }
    }

    public class CardGameTextArea
    {
        [ScriptName("text")]
        [IntrinsicProperty]
        public string Text { get; set; }
        [ScriptName("x")]
        [IntrinsicProperty]
        public double X { get; set; }
        [ScriptName("y")]
        [IntrinsicProperty]
        public double Y { get; set; }
    }

    public class GameInfo
    {
        public string RoomID = "-1";
    }
}