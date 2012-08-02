using System;
using System.Runtime.CompilerServices;

namespace Models
{
    [Serializable]
    public sealed class GatewayMessageModel
    {
        public GatewayMessageModel(string channel, object content, string gameServer)
        {
            Channel = channel;
            Content = content;
            GameServer = gameServer;
        }

        [IntrinsicProperty]
        public string Channel { get; set; }

        [IntrinsicProperty]
        public object Content { get; set; }

        [IntrinsicProperty]
        public string GameServer { get; set; }
    }
}