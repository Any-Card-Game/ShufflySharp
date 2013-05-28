using System.Runtime.CompilerServices;
using CardGameUI.Util;
namespace CardGameUI.Scope
{
    public class EffectEditorScope : BaseScope
    {
        [IntrinsicProperty]
        public Effect Effect { get; set; }
    }
}