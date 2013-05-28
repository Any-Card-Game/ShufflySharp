using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
namespace CardGameUI.Services
{
    internal class EditEffectService
    {
        [IntrinsicProperty]

        public Action<Effect> PopOpenEffect { get; set; }
    }
    public class EffectWatcherService
    {
        [IntrinsicProperty]

        public Action<Effect> ApplyEffect { get; set; }
    }
    public class EffectManagerService
    {
        [IntrinsicProperty]

        public List<Effect> Effects { get; set; }

        public Effect GetEffectByName(string effect)
        {

            foreach (var eff in Effects) {
                if (eff.Name.ToLower() == effect.ToLower()) {
                    return eff;
                }
            }
            return null;
        }
    }
    
}