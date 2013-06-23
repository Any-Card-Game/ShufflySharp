using System;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;
namespace Client.Services
{
    public class EffectWatcherService
    {
        [IntrinsicProperty]

        public Action<GameEffectModel> ApplyEffect { get; set; }
    }
}