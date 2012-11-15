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
        [IntrinsicProperty]
        public string GameServer { get; set; }

        public GatewayMessageModel(string channel, object content, string gameServer)
        {
            Channel = channel;
            Content = content;
            GameServer = gameServer;
        }
    }
}