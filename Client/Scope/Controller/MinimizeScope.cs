using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;

namespace Client.Scope.Controller
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