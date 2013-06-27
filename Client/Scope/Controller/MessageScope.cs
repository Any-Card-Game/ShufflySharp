using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
namespace Client.Scope.Controller
{
    public class MessageScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public MessageModel Model { get; set; } 

    }
    [Serializable]
    public class MessageModel 
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public Action Callback { get; set; }
        public MessageType MessageType { get; set; }
        public string Response { get; set; }
    }
    [NamedValues]
    public enum MessageType
    {
        Okay,Question
    }
}