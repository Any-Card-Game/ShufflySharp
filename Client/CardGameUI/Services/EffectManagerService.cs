using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
namespace CardGameUI.Services
{
    public class EffectManagerService
    {
        [IntrinsicProperty]

        public List<Effect> Effects { get; set; }
        public EffectManagerService()
        {
            Effects=new List<Effect>();
        }

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