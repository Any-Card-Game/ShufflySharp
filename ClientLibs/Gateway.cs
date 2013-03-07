using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using Models;
using NodeJSLibrary;
using SocketIOWebLibrary;
namespace ClientLibs
{
    public delegate void GatewayMessage(UserModel user, object obj);
    public class Gateway
    {
        private Dictionary<string, GatewayMessage> channels;
        [IntrinsicProperty]
        private SocketIOClient GatewaySocket { get; set; }

        public Gateway(string gatewayServer,bool server)
        {
            channels = new Dictionary<string, GatewayMessage>();
            if (server) {
                GatewaySocket = Global.Require<SocketIOClient>("socket.io-client").AConnect(gatewayServer);
            } else {
                GatewaySocket = SocketIOClient.Connect(gatewayServer);
            }
            GatewaySocket.On<SocketClientMessageModel>("Client.Message", data => channels[data.Channel](data.User, data.Content));
            GatewaySocket.On<string>("disconnect", data => {
                                                       Console.Log("Disconnected");

                                                   });
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