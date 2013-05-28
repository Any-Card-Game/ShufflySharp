using System.Runtime.CompilerServices;
using CardGameUI.Util;
using global;
namespace CardGameUI.Scope
{
    public class SpaceScope : BaseScope
    {

        [IntrinsicProperty]
        public CardGameTableSpace Space { get; set; }
        [IntrinsicProperty]
        [ScriptName("$parent")]
        public GameCtrlScope Parent { get; set; }
        [IntrinsicProperty]
        public dynamic SpaceStyle { get; set; } 

    }
}