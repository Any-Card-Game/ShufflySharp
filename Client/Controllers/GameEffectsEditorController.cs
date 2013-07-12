using System.Collections.Generic;
using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using CommonLibraries;
using Models.SiteManagerModels.Game;
namespace Client.Controllers
{
    internal class GameEffectsEditorController
    {
        private readonly GameEffectsEditorScope myScope;
        private readonly CreateUIService createUIService;

        public GameEffectsEditorController(GameEffectsEditorScope scope, CreateUIService createUIService)
        {
            myScope = scope;
            this.createUIService = createUIService;
            var effectTypes = new List<EffectType>();

            effectTypes.Add(EffectType.Bend);
            effectTypes.Add(EffectType.Highlight);
            effectTypes.Add(EffectType.Rotate);
            effectTypes.Add(EffectType.StyleProperty);
            scope.Visible = true;

            myScope.Model.EffectTypes = effectTypes;
            myScope.Model.NewEffectType = EffectType.Bend;

            myScope.Model.NewEffectName = "";

            myScope.Model.AddEffect = AddEffectFn;
            myScope.Model.RemoveEffect = RemoveEffectFn;

            myScope.watch("model.selection.selectedEffect", () =>
                                                            {
                                                                if (myScope.Model.Selection.SelectedEffect != null)
                                                                {

                                                                }
                                                            });


var effectTesterUI=            createUIService.CreateSingleton<EffectTesterControllerScope>("EffectTester", (_scope, elem) =>
            {
                _scope.Model = new EffectTesterControllerScopeModel();
                _scope.Model.Game = myScope.Model.Game;
                _scope.Model.Selection = myScope.Model.Selection;

            });
            myScope.OnClose += effectTesterUI.Destroy;

        }


        private void AddEffectFn()
        {
            GameEffectModel effect;
            myScope.Model.Game.Effects.Add(effect=makeEffect(myScope.Model.NewEffectName, myScope.Model.NewEffectType));

            myScope.Model.NewEffectType = EffectType.Bend;

            myScope.Model.NewEffectName = "";
            myScope.Model.Selection.SelectedEffect = effect;
            GameLayoutEditorController.SureUpScenarios(myScope.Model.Game);
        }

        private void RemoveEffectFn(GameEffectModel effect)
        {
            myScope.Model.Game.Effects.Remove(effect);
            myScope.Model.Selection.SelectedEffect = null;
            GameLayoutEditorController.SureUpScenarios(myScope.Model.Game);
        }

        public static GameEffectModel makeEffect(string effectName, EffectType type)
        {
            GameEffectModel effect = new GameEffectModel() { Name = effectName ,Properties=new List<GameEffectPropertyModel>(),Guid=Guid.NewGuid()};
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
         
    }
}