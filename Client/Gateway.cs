using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using CommonsLibraries;
using SocketIOWebLibrary;

namespace Client
{
    public class Gateway
    {
        private JsDictionary<string, Action<dynamic>> channels;

        public Gateway(string gatewayServer)
        {
            channels = new JsDictionary<string, Action<dynamic>>();

            GatewaySocket = SocketIOClient.Connect(gatewayServer);
            GatewaySocket.On<dynamic>("Client.Message", data =>
                {
                    channels[data.channel](data.content);
                });


        }

        protected SocketIOClient GatewaySocket { get; set; }
        public void Emit(string channel, object content, string gameServer = null)
        {
            GatewaySocket.Emit("Gateway.Message", new { Channel = channel, Content = content, GameServer = gameServer });

        }

        public void On(string channel, Action<dynamic> callback)
        {
            channels[channel] = callback;

        }
        public void Login(string userName)
        {
            GatewaySocket.Emit("Gateway.Login", new { Username = userName });


        }
    }

}
