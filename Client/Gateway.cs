using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using CommonsLibraries;
using Models;
using SocketIOWebLibrary;

namespace Client
{
    public class Gateway
    {
        private dynamic channels;

        public Gateway(string gatewayServer)
        {
            channels = new JsDictionary<string, Action<dynamic>>();
            var someChannels = channels;
            GatewaySocket = SocketIOClient.Connect(gatewayServer);
            GatewaySocket.On<dynamic>("Client.Message", data =>
                {
                    someChannels[data.channel](data.content);
                });


        }

        protected SocketIOClient GatewaySocket { get; set; }
        
        [IgnoreGenericArguments]
        public void Emit<T>(string channel, T content, string gameServer = null)
        {
            GatewaySocket.Emit("Gateway.Message",new GatewayMessageModel(channel,content,gameServer) );

        }
        [IgnoreGenericArguments]

        public void On<T>(string channel, Action<T> callback)
        {
            channels[channel] = callback;

        }
        public void Login(string userName)
        {
            GatewaySocket.Emit("Gateway.Login", new { username = userName });


        }
    }

}
