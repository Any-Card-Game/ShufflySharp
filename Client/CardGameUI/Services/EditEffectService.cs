using System;
using System.Runtime.CompilerServices;
using CardGameUI.Util;
namespace CardGameUI.Services
{
    internal class EditEffectService
    {
        [IntrinsicProperty]

        public Action<Effect> PopOpenEffect { get; set; }
    }
}