using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CardGameUI.Directives;
namespace CardGameUI.Scope
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