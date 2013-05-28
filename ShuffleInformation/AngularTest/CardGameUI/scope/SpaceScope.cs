using System.Runtime.CompilerServices;
using Client.Angular.interfaces;
using global;
namespace AngularTest.scope
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