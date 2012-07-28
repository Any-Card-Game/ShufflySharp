using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibraries;
using NodeJSLibrary;
using SocketIONodeLibrary;

namespace GatewayServer
{
    public class GatewayServer
    {

        public JsDictionary<string, User> users = new JsDictionary<string, User>();
        PubSub ps;
        public GatewayServer()
        {

            Http http = Global.Require<Http>("http");
            HttpServer app = http.CreateServer((req, res) => res.End());

            SocketIoClient io = Global.Require<SocketIO>("socket.io").Listen(app);
            FS fs = Global.Require<FS>("fs"); 
            QueueManager queueManager;
            int port = 1800 + Math.Truncate((int)(Math.Random() * 4000));
             

            app.Listen(port);
            io.Set("log level", 1);
            string myName = "Gateway " + Guid.NewGuid();

            ps = new PubSub(()=>
            {
                ps.Subscribe("PUBSUB.GatewayServers.Ping", message => ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port)));
                ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port));


            });

            queueManager = new QueueManager(myName,
                                            new QueueManagerOptions(new[]
                                                                        {
                                                                            new QueueWatcher("GatewayServer",messageReceived),
                                                                            new QueueWatcher(myName,messageReceived)
                                                                        },
                                                                    new[]
                                                                        {
                                                                            "SiteServer",
                                                                            "GameServer*",
                                                                            "DebugServer", 
                                                                            "ChatServer", 
                                                                            "HeadServer"
                                                                        }));
            io.Sockets.On("connection", (SocketIOConnection socket) =>
                {
                    User user = null;
                    socket.On("Gateway.Message", (GatewayMessage data) =>
                        {
                            string channel = "Bad";
                            switch (data.Channel.Split('.')[1])
                            {
                                case "Game":
                                    channel = "GameServer";
                                    break;
                                case "Site":
                                    channel = "SiteServer";
                                    break;
                                case "Debug":
                                    channel = "GameServer";
                                    break;
                                case "Debug2":
                                    channel = "DebugServer";
                                    break;
                                case "Chat":
                                    channel = "ChatServer";
                                    break;
                            }
                            queueManager.SendMessage(user, data.GameServer ?? channel, data.Channel, data.Content);
                        });

                    socket.On("Gateway.Login", (GatewayLoginMessage data) =>
                        {
                            user = new User();
                            user.Socket = socket;
                            user.UserName = data.UserName;
                            users[data.UserName] = user;
                        });
                    socket.On("disconnect", (string data) => users.Remove(user.UserName));
                });

        }




        private void messageReceived(string gateway, User user, string eventChannel, object content)
        {
            if (users.ContainsKey(user.UserName))
            {
                User u = users[user.UserName];
                u.Socket.Emit("Client.Message", new SocketClientMessage(user, eventChannel, content));
            }
        }

    }


    /*
     
var redis = require("redis")
redis.DebugMode = false;


var pubsub = function (ready) {
    var self = this;
    var subclient = redis.createClient(6379, Common.RedisIP);
    var pubclient = redis.createClient(6379, Common.RedisIP);
    self.subbed = {};

    subclient.on("subscribe", function (channel, count) {
        //console.log('subscribed: ' + channel + " " + count);
    });
    subclient.on("unsubscribe", function (channel, count) {
        //console.log('unsubscribed: ' + channel + " " + count);

    });

    subclient.on("message", function (channel, message) {


        if (self.subbed[channel]) {
            self.subbed[channel].callback(message);
        }
    });
    var pready, sready;
    subclient.on("ready", function () {
        sready = true;
        if (sready && pready) {
            ready();
        }
    });

    pubclient.on("ready", function () {
        pready = true;
        if (sready && pready) {
            ready();
        }
    });


    self.publish = function (channel, Content) {
        pubclient.publish(channel, Content);
    }
    self.subscribe = function (channel, callback) {
        subclient.subscribe(channel);
        self.subbed[channel] = { callback: callback };
    }

    return self;
};

module.exports = pubsub;
     */
}
