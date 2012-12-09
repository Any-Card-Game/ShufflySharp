using System;
using System.Collections.Generic;
using CommonLibraries;
namespace global
{
    [Serializable]
    public class CardGameArea
    {
        public Size Size { get; set; }
        public List<CardGameTableSpace> Spaces { get; set; }
        public List<GameCardGameTextArea> TextAreas { get; set; }
    }
}