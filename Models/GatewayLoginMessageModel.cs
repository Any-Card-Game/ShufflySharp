using System.Runtime.CompilerServices;

namespace Models
{
    [Record]

    public sealed class GatewayLoginMessageModel
    {
        [IntrinsicProperty]
        public string UserName { get; set; }

        [IntrinsicProperty]
        public string Password { get; set; }
    }
}