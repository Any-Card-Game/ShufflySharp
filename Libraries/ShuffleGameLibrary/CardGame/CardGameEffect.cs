using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;

namespace global
{
    public class CardGameEffect
    {
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public EffectType Type { get; set; }
        [IntrinsicProperty]
        public List<CardGameEffectProperty> Properties { get; set; }

        public CardGameEffect(CardGameEffectOptions cardGameEffectOptions)
        {
            Name = cardGameEffectOptions.Name;
            Type = cardGameEffectOptions.Type;
            Properties = cardGameEffectOptions.Properties;
        }
    }
    [Serializable]
    public class CardGameEffectOptions
    {
        public string Name { get; set; }
        public EffectType Type   { get; set; }
        public List<CardGameEffectProperty> Properties { get; set; }
    }
    [Serializable]
    public class CardGameEffectProperty
    {
        public string Name { get; set; }
        public object Value { get; set; }
    }

    public static class EffectHelper
    {
        public static double GetNumber(this CardGameEffect effect, string name)
        {
            foreach (var effectProperty in effect.Properties)
            {
                if (effectProperty.Name.ToLower() == name.ToLower())
                {
                    return double.Parse(effectProperty.Value.ToString());
                }
            }
            return 0.0;
        }
        public static string GetString(this CardGameEffect effect, string name)
        {
            foreach (var effectProperty in effect.Properties)
            {
                if (effectProperty.Name.ToLower() == name.ToLower())
                {
                    return effectProperty.Value.ToString();
                }
            }
            return "";
        }
    }

}