using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;

namespace global
{
    [Record]
    public sealed class CardGameArea
    {
        [ScriptName("size")]
        [IntrinsicProperty]
        public Size Size { get; set; }

        [ScriptName("spaces")]
        [IntrinsicProperty]
        public List<CardGameTableSpace> Spaces { get; set; }

        [ScriptName("textAreas")]
        [IntrinsicProperty]
        public List<CardGameTextArea> TextAreas { get; set; }
    }
}