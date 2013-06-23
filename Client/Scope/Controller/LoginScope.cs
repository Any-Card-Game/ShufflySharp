using System;
using System.Runtime.CompilerServices;
using Client.Scope.Directive;
namespace Client.Scope.Controller
{
    public class LoginScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public LoginModel Model { get; set; } 
    }
    [Serializable]
    public class LoginModel 
    {
        public Action WindowClosed { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Action CreateAccount { get; set; }
        public Action LoginAccount { get; set; }
    }
}