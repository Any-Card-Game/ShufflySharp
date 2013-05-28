using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using System.Serialization;
using AngularTest;
using Client.Angular.interfaces;
using global;
using ng;
namespace Client.Angular.controllers
{
    internal class ListEffectsController
    {
        private readonly ListEffectsScope myScope;
        private readonly EditEffectService myEditEffects;

        public ListEffectsController(ListEffectsScope scope, EditEffectService editEffects)
        {
            myScope = scope;
            myEditEffects = editEffects;
            scope.Effects = new List<Effect>();
            scope.EffectTypes = new List<EffectType2>();

            scope.EffectTypes.Add(EffectType2.Bend);
            scope.EffectTypes.Add(EffectType2.Highlight);
            scope.EffectTypes.Add(EffectType2.Rotate);
            scope.EffectTypes.Add(EffectType2.StyleProperty);

            scope.EffectTypesNames = scope.EffectTypes.Map(a => new CheckboxListItem() { Name = a.ToString(), Checked = false });
            scope.Effects.Add(new Effect() { Name = "Some Highlighter", Type = EffectType2.Highlight });
            scope.NewEffect = "hi";
            scope.AddEffect = AddEffectFn;
            scope.EffectClick = EffectClickFn;

        }

        private void AddEffectFn()
        {
            Effect effect = new Effect() { Name = myScope.NewEffect };
            foreach (var checkboxListItem in myScope.EffectTypesNames)
            {
                if (checkboxListItem.Checked)
                {
                    effect.Type = (EffectType2)Enum.Parse(typeof(EffectType2), checkboxListItem.Name);
                }
                checkboxListItem.Checked = false;
            }

            myScope.Effects.Add(effect);
            myScope.NewEffect = "Hi!";
        }
        private void EffectClickFn(Effect effect)
        {
            myEditEffects.PopOpenEffect(effect);
        }
    }
     internal class EffectEditorController
    {
        private readonly EffectEditorScope myScope;
        private readonly EditEffectService myEditEffects;

        public EffectEditorController(EffectEditorScope scope, EditEffectService editEffects)
        {
            myScope = scope;
            myEditEffects = editEffects;
            editEffects.PopOpenEffect +=PopOpenEffectFn;

        }

         private void PopOpenEffectFn(Effect effect)
         {

             myScope.Effect = effect;
         }
    }
    [NamedValues]
    public enum EffectType2
  {
    Highlight,
    Rotate,
    Bend,
    StyleProperty,
    Animated,
  }

    [Serializable]
    public class CheckboxListItem
    {
        public string Name { get; set; }
        public bool Checked { get; set; }
    }
/*
    public class EffectLibrary
    {
        JsDictionary<string,> 
     }*/
}