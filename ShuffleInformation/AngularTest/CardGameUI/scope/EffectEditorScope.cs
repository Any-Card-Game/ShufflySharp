using System.Runtime.CompilerServices;
using Client.Angular.interfaces;
namespace AngularTest.scope
{
    public class EffectEditorScope : BaseScope
    {
        [IntrinsicProperty]
        public Effect Effect { get; set; }
    }
}