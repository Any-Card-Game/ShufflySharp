using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;
namespace Client.Services
{
    public class EffectManagerService
    {
        [IntrinsicProperty]

        public List<GameEffectModel> Effects { get; set; }
        public EffectManagerService()
        {
            Effects = new List<GameEffectModel>();
        }

        public GameEffectModel GetEffectByName(string effect)
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