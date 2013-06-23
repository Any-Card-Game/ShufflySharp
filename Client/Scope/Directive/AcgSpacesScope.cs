using System.Collections.Generic;
using System.Runtime.CompilerServices;
using global;
namespace Client.Scope.Directive
{
    public class AcgSpacesScope : BaseScope
    {
        [IntrinsicProperty]
        public List<CardGameTableSpace> Spaces { get; set; }
        [IntrinsicProperty]
        public CardGameTableSpace Space{ get; set; }
        
    }
}