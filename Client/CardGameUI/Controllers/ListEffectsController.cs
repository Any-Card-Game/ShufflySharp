using System;
using System.Collections.Generic;
using CardGameUI.Scope;
using CardGameUI.Services;
using CardGameUI.Util;
namespace CardGameUI.Controllers
{
    internal class ListEffectsController
    {
        private readonly ListEffectsScope myScope;
        private readonly EditEffectService myEditEffects;
        private readonly EffectWatcherService myEffectWatcher;

        public ListEffectsController(ListEffectsScope scope, EditEffectService editEffects, EffectWatcherService effectWatcher, EffectManagerService effectManager)
        {
            myScope = scope;
            myEditEffects = editEffects;
            myEffectWatcher = effectWatcher;
            scope.Effects = effectManager .Effects= new List<Effect>();
            var effectTypes = new List<EffectType2>();

            effectTypes.Add(EffectType2.Bend);
            effectTypes.Add(EffectType2.Highlight);
            effectTypes.Add(EffectType2.Rotate);
            effectTypes.Add(EffectType2.StyleProperty);

            scope.EffectTypes = effectTypes;
            scope.SelectedEffectType = EffectType2.Bend;

            scope.NewEffect = "";
            scope.AddEffect = AddEffectFn;
            scope.EffectClick = EffectClickFn;
            scope.EnableEffect = EnableEffectFn;

            myScope.Effects.Add(makeEffect("bend", EffectType2.Bend));


        }

        private void EnableEffectFn(Effect effect)
        {
            myEffectWatcher.ApplyEffect(effect);
        }

        private void AddEffectFn()
        {
            myScope.Effects.Add(makeEffect(myScope.NewEffect, myScope.SelectedEffectType));
            
            myScope.SelectedEffectType = EffectType2.Bend;
            
            myScope.NewEffect = "";
        }

        private static Effect makeEffect(string effectName, EffectType2 type)
        {
            Effect effect = new Effect() {Name = effectName};
            effect.Type = type;
            switch (effect.Type) {
                case EffectType2.Highlight:
                    effect.Properties.Add(new EffectProperty() {Name = "Radius", Value = 5, Type = EffectPropertyType.Number});
                    effect.Properties.Add(new EffectProperty() {Name = "Color", Value = "#242444", Type = EffectPropertyType.Color});
                    effect.Properties.Add(new EffectProperty() {Name = "Opacity", Value = 0.5, Type = EffectPropertyType.Number});
                    effect.Properties.Add(new EffectProperty() {Name = "Rotate", Value = 0, Type = EffectPropertyType.Number});
                    effect.Properties.Add(new EffectProperty() {Name = "OffsetX", Value = 0, Type = EffectPropertyType.Number});
                    effect.Properties.Add(new EffectProperty() {Name = "OffsetY", Value = 0, Type = EffectPropertyType.Number});
                    break;
                case EffectType2.Rotate:
                    effect.Properties.Add(new EffectProperty() {Name = "Degrees", Value = 90, Type = EffectPropertyType.Number});
                    break;
                case EffectType2.Bend:
                    effect.Properties.Add(new EffectProperty() {Name = "Degrees", Value = 15, Type = EffectPropertyType.Number});
                    break;
                case EffectType2.StyleProperty:
                    effect.Properties.Add(new EffectProperty() {Name = "Property Name", Value = "background-color", Type = EffectPropertyType.Text});
                    effect.Properties.Add(new EffectProperty() {Name = "Property Value", Value = "red", Type = EffectPropertyType.Text});
                    break;
                case EffectType2.Animated:
                    effect.Properties.Add(new EffectProperty() {Name = "idk", Value = "rite?", Type = EffectPropertyType.Text});
                    break;
            }

            return effect;
        }

        private void EffectClickFn(Effect effect)
        {
            myEditEffects.PopOpenEffect(effect);
        }
    }
}