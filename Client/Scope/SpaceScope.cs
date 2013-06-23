using System.Runtime.CompilerServices;
using global;
namespace Client.Scope
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