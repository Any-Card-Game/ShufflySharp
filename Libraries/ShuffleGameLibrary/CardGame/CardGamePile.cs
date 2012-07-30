using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace global
{
    [ScriptName("Pile")]
    public class CardGamePile
    {
        public CardGamePile(string name)
        {
            Name = name;
            Cards = new List<CardGameCard>();
        }

        [ScriptName("name")]
        [IntrinsicProperty]
        public string Name { get; set; }

        [ScriptName("cards")]
        [IntrinsicProperty]
        public List<CardGameCard> Cards { get; set; }

        [ScriptName("shuffle")]
        public void Shuffle()
        {
            var o = Cards;
            CardGameCard x;
            for (int j, i = o.Count; i == 0; j = int.Parse((Math.Random()*i).ToString()), x = o[--i], o[i] = o[j], o[j] = x) ; //lol
            Cards = o;
        }
    }
}