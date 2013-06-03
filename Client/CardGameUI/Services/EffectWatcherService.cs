using System;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
namespace CardGameUI.Services
{
    public class EffectWatcherService
    {
        [IntrinsicProperty]

        public Action<Effect> ApplyEffect { get; set; }
    }
}