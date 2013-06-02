using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace global
{
    [ScriptName("Appearance")]
    public class CardGameAppearance : CardGameAppearanceStyle
    {
        [IntrinsicProperty]
        public List<CardGameAppearanceEffect> Effects { get; set; }
        [IntrinsicProperty]
        public List<string> EffectNames { get; set; }

        public CardGameAppearance()
        {
            Effects = new List<CardGameAppearanceEffect>();
        }

        public static CardGameAppearance FromJson(CardGameAppearance json)
        {
            CardGameAppearance ap = new CardGameAppearance();
            ap.InnerStyle = CardGameAppearanceStyleItem.FromJson(json.InnerStyle);
            ap.OuterStyle = CardGameAppearanceStyleItem.FromJson(json.OuterStyle);
            ap.Effects = new List<CardGameAppearanceEffect>();
            if (json.Effects != null) {
                foreach (var effect in json.Effects) {
                    ap.Effects.Add(CardGameAppearanceEffect.FromJson(effect));
                }
            }

            return ap;
        }
    }
    //[NamedValues]todo:::
}