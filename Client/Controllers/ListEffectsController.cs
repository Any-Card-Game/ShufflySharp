using System.Collections.Generic;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Models.SiteManagerModels.Game;
namespace Client.Controllers
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
            scope.Effects = effectManager.Effects = new List<GameEffectModel>();
            var effectTypes = new List<EffectType>();

            effectTypes.Add(EffectType.Bend);
            effectTypes.Add(EffectType.Highlight);
            effectTypes.Add(EffectType.Rotate);
            effectTypes.Add(EffectType.StyleProperty);

            scope.EffectTypes = effectTypes;
            scope.SelectedEffectType = EffectType.Bend;

            scope.NewEffect = "";
            scope.AddEffect = AddEffectFn;
            scope.EffectClick = EffectClickFn;
            scope.EnableEffect = EnableEffectFn;

            myScope.Effects.Add(makeEffect("bend", EffectType.Bend));


        }

        private void EnableEffectFn(GameEffectModel effect)
        {
            myEffectWatcher.ApplyEffect(effect);
        }

        private void AddEffectFn()
        {
            myScope.Effects.Add(makeEffect(myScope.NewEffect, myScope.SelectedEffectType));
            
            myScope.SelectedEffectType = EffectType.Bend;
            
            myScope.NewEffect = "";
        }

        public static GameEffectModel makeEffect(string effectName, EffectType type)
        {
            GameEffectModel effect = new GameEffectModel() { Name = effectName };
            effect.Type = type;
            switch (effect.Type) {
                case EffectType.Highlight:
                    effect.Properties.Add(new GameEffectPropertyModel() {Name = "Radius", Value = 5, Type = GameEffectPropertyType.Number});
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "Color", Value = "#242444", Type = GameEffectPropertyType.Color });
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "Opacity", Value = 0.5, Type = GameEffectPropertyType.Number });
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "Rotate", Value = 0, Type = GameEffectPropertyType.Number });
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "OffsetX", Value = 0, Type = GameEffectPropertyType.Number });
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "OffsetY", Value = 0, Type = GameEffectPropertyType.Number });
                    break;
                case EffectType.Rotate:
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "Degrees", Value = 90, Type = GameEffectPropertyType.Number });
                    break;
                case EffectType.Bend:
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "Degrees", Value = 15, Type = GameEffectPropertyType.Number });
                    break;
                case EffectType.StyleProperty:
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "Property Name", Value = "background-color", Type = GameEffectPropertyType.Text });
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "Property Value", Value = "red", Type = GameEffectPropertyType.Text });
                    break;
                case EffectType.Animated:
                    effect.Properties.Add(new GameEffectPropertyModel() { Name = "idk", Value = "rite?", Type = GameEffectPropertyType.Text });
                    break;
            }

            return effect;
        }

        private void EffectClickFn(GameEffectModel effect)
        {
            myEditEffects.PopOpenEffect(effect);
        }
    }
}