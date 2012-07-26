// Class1.cs
//

using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibraries;
using NodeJSLibrary;
using SocketIOLibrary;

namespace GatewayServer
{
    public class GatewayServer
    {

        public Dictionary<string, User> users = new Dictionary<string, User>();
        PubSub ps;
        public GatewayServer()
        {

            Http http = Global.Require<Http>("http");
            HttpServer app = http.CreateServer(delegate(HttpRequest req, HttpResponse res)
            {
                res.End();
            });

            SocketIoClient io = Global.Require<SocketIO>("socket.io").Listen(app);
            FS fs = Global.Require<FS>("fs"); 
            QueueManager queueManager;
            int port = 1800 + Math.Truncate((Number)(Math.Random() * 4000));
             

            app.Listen(port);
            io.Set("log level", 1);
            string myName = "Gateway " + Guid.NewGuid();

            ps = new PubSub(delegate()
            {
                ps.Subscribe("PUBSUB.GatewayServers.Ping", delegate(object message)
                {
                    ps.Publish("PUBSUB.GatewayServers", "http://" + IPs.GatewayIP + ":" + port);
                });
                ps.Publish("PUBSUB.GatewayServers", "http://" + IPs.GatewayIP + ":" + port);


            });

            queueManager = new QueueManager(myName,
                                            new QueueManagerOptions(new QueueWatcher[]
                                                                        {
                                                                            new QueueWatcher("GatewayServer",messageReceived),
                                                                            new QueueWatcher(myName,messageReceived)
                                                                        },
                                                                    new string[]
                                                                        {
                                                                            "SiteServer",
                                                                            "GameServer*",
                                                                            "DebugServer", 
                                                                            "ChatServer", 
                                                                            "HeadServer"
                                                                        }));
            io.Sockets.On("connection", delegate(SocketIOConnection socket)
            {
                User user = null;
                socket.On("Gateway.Message", delegate(GatewayMessage data)
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
                    queueManager.SendMessage(user, data.GameServer ?? channel, data.Channel,data.Content);
                });

                socket.On("Gateway.Login", delegate(GatewayLoginMessage data)
                                               {
                                                   
                                                   user  = new User()  ;
                                                   user.Socket = socket;
                                                   user.UserName = data.UserName;
                                                   users[data.UserName] = user;
                                               });
                socket.On("disconnect", delegate(string data)
                                            {
                                                users.Remove(user.UserName);
                                            });
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
