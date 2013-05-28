using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Angular.controllers;
using global;
using ng;
namespace Client.Angular.interfaces
{

    public class ListEffectsScope : BaseScope
    {
        [IntrinsicProperty]
        public string NewEffect { get; set; }
        [IntrinsicProperty]
        public Action AddEffect { get; set; }
        [IntrinsicProperty]
        public List<Effect> Effects { get; set; }
        [IntrinsicProperty]
        public List<EffectType2> EffectTypes { get; set; }
        [IntrinsicProperty]
        public List<CheckboxListItem> EffectTypesNames { get; set; }
        [IntrinsicProperty]
        public Action<Effect> EffectClick { get; set; }
    }
    public class EffectEditorScope : BaseScope
    {
        [IntrinsicProperty]
        public Effect Effect { get; set; }
    }
    [Serializable]
    public class Effect
    {
        public Effect() {
            Properties = new JsDictionary<string, string>();
        }
        public string Name { get; set; }
        public EffectType2 Type { get; set; }
        public JsDictionary<string, string> Properties { get; set; }
    }

    public class GameCtrlScope : BaseScope
    {
        [IntrinsicProperty]

        public GameCardGame MainArea { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        public Action MoveCard { get; set; }
        [IntrinsicProperty]
        public CardGameCard SelectedCard { get; set; }

    }
    public class CardScope : BaseScope
    {
        [IntrinsicProperty]
        public CardGameCard Card { get; set; } 
        [IntrinsicProperty]
        public dynamic CardStyle { get; set; } 
        [IntrinsicProperty]
        public Action CardClick { get; set; }
        [IntrinsicProperty]
        [ScriptName("$parent")]
        public SpaceScope Parent { get; set; }
    }
    public class SpaceScope : BaseScope
    {

        [IntrinsicProperty]
        public CardGameTableSpace Space { get; set; }
        [IntrinsicProperty]
        [ScriptName("$parent")]
        public GameCtrlScope Parent { get; set; }
        [IntrinsicProperty]
        public dynamic SpaceStyle { get; set; } 

    }
    
    [Serializable]
    public class Point
    {
        public double X { get; set; }
        public double Y { get; set; }

    }
}