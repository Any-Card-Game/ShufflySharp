using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models;
using SocketIOWebLibrary;
namespace ClientLibs
{
    public delegate void GatewayMessage(UserModel user, object obj);
    public class Gateway
    {
        private Dictionary<string, GatewayMessage> channels;
        [IntrinsicProperty]
        protected SocketIOClient GatewaySocket { get; set; }

        public Gateway(string gatewayServer)
        {
            channels = new Dictionary<string, GatewayMessage>();
            GatewaySocket = SocketIOClient.Connect(gatewayServer);
            GatewaySocket.On<SocketClientMessageModel>("Client.Message", data => channels[data.Channel](data.User, data.Content));
        }
         
        public void Emit(string channel, object content = null)
        {
            GatewaySocket.Emit("Gateway.Message", new GatewayMessageModel(channel, content));
        }
         
        public void On(string channel, GatewayMessage callback)
        {
            channels[channel] = callback;
        }

        //todo global login
        public void Login(string userName, string password)
        {
            GatewaySocket.Emit("Gateway.Login", new UserModel { UserName = userName, Password = password });
        }
    }
}