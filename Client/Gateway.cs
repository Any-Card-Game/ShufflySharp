using System;
using System.Runtime.CompilerServices;
using Models;
using SocketIOWebLibrary;

namespace Client
{
    public class Gateway
    {
        private dynamic channels; //::dynamic okay

        public Gateway(string gatewayServer)
        {
            channels = new object();
            var someChannels = channels;
            GatewaySocket = SocketIOClient.Connect(gatewayServer);
            GatewaySocket.On<SocketClientMessageModel>("Client.Message", data => { someChannels[data.Channel](data.Content); });
        }

        [IntrinsicProperty]
        protected SocketIOClient GatewaySocket { get; set; }

        [IgnoreGenericArguments]
        public void Emit<T>(string channel, T content, string gameServer = null)
        {
            GatewaySocket.Emit("Gateway.Message", new GatewayMessageModel(channel, content, gameServer));
        }

        [IgnoreGenericArguments]
        public void On<T>(string channel, Action<T> callback)
        {
            channels[channel] = callback;
        }

        public void Login(string userName)
        {
            GatewaySocket.Emit("Gateway.Login", new UserModel {UserName = userName});
        }
    }
}