using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
namespace Client.Scope.Controller
{
    public class MessageScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public string Title { get; set; }
        [IntrinsicProperty]
        public string Message { get; set; }
        [IntrinsicProperty]
        public Action Okay { get; set; }
    }
}