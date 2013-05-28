using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace CardGameUI.Util
{
    public class Effect
    {
        public Effect() {
            Properties = new List<EffectProperty>();
        }
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public EffectType2 Type { get; set; }
        [IntrinsicProperty]
        public List<EffectProperty> Properties { get; set; }


        public T GetPropertyByName<T>(string name)
        {
            foreach (var effectProperty in Properties) {
                if (effectProperty.Name.ToLower() == name.ToLower())
                {
                    return (T)effectProperty.Value;
                }
            }
            return default( T );
        }
    }
    [Serializable]
    public class EffectProperty
    {
        public string Name { get; set; }
        public object Value { get; set; }
        public EffectPropertyType Type { get; set; }
    }
    [NamedValues]
    public enum EffectPropertyType
    {
        Text,Number,Color
    }
}