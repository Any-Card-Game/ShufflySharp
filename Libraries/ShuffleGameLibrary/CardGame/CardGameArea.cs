using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace global
{
    [Serializable]
    public class CardGameArea
    {
        [ScriptName("size")]
        [IntrinsicProperty]
        public Size Size { get; set; }
        [ScriptName("spaces")]
        [IntrinsicProperty]
        public List<CardGameTableSpace> Spaces { get; set; }
        [ScriptName("textAreas")]
        [IntrinsicProperty]
        public List<GameCardGameTextArea> TextAreas { get; set; }
    }
}