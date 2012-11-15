using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class GatewayLoginMessageModel
    {
        [IntrinsicProperty]
        public string UserName { get; set; }
        [IntrinsicProperty]
        public string Password { get; set; }
    }
}