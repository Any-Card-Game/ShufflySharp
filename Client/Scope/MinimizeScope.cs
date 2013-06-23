using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Directives;
namespace Client.Scope
{
    public class MinimizeScope : BaseScope
    {

        [IntrinsicProperty]
        public List<FloatingWindowScope> Items { get; set; }
        [IntrinsicProperty]
        public Action<FloatingWindowScope> Open { get; set; }
        [IntrinsicProperty]
        public Action<FloatingWindowScope> Remove { get; set; }
    }
}