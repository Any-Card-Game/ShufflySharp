using System;
using System.Runtime.CompilerServices;
using Models.SiteManagerModels.Game;
namespace Client.Services
{
    internal class EditEffectService
    {
        [IntrinsicProperty]

        public Action<GameEffectModel> PopOpenEffect { get; set; }
    }
}