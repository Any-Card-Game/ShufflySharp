using System;
using System.Runtime.CompilerServices;
namespace Client.Scope
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