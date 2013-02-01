using System;
using System.Runtime.CompilerServices;
namespace Models
{
    [Serializable]
    public class GatewayMessageModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }
        [IntrinsicProperty]
        public object Content { get; set; }

        public GatewayMessageModel(string channel, object content)
        {
            Channel = channel;
            Content = content;
        }
    }
}