//! GatewayServer.debug.js
//

(function() {

Type.registerNamespace('GatewayServer');

////////////////////////////////////////////////////////////////////////////////
// GatewayServer.GatewayLoginMessage

GatewayServer.GatewayLoginMessage = function GatewayServer_GatewayLoginMessage() {
    /// <field name="userName" type="String">
    /// </field>
    /// <field name="password" type="String">
    /// </field>
}
GatewayServer.GatewayLoginMessage.prototype = {
    userName: null,
    password: null
}


////////////////////////////////////////////////////////////////////////////////
// GatewayServer.GatewayMessage

GatewayServer.GatewayMessage = function GatewayServer_GatewayMessage() {
    /// <field name="channel" type="String">
    /// </field>
    /// <field name="content" type="String">
    /// </field>
    /// <field name="gameServer" type="String">
    /// </field>
}
GatewayServer.GatewayMessage.prototype = {
    channel: null,
    content: null,
    gameServer: null
}


////////////////////////////////////////////////////////////////////////////////
// GatewayServer.GatewayServer

GatewayServer.GatewayServer = function GatewayServer_GatewayServer() {
    /// <field name="users" type="Object">
    /// </field>
    /// <field name="_ps" type="CommonShuffleLibraries.PubSub">
    /// </field>
    this.users = {};
    var http = require('http');
    var app = http.createServer(function(req, res) {
        res.end();
    });
    var io = require('socket.io').listen(app);
    var fs = require('fs');
    var queueManager;
    var port = 1800 + parseInt((Math.random() * 4000));
    app.listen(port);
    io.set('log level', 1);
    var myName = 'Gateway ' + CommonLibraries.Guid.newGuid();
    this._ps = new CommonShuffleLibraries.PubSub(ss.Delegate.create(this, function() {
        this._ps.subscribe('PUBSUB.GatewayServers.Ping', ss.Delegate.create(this, function(message) {
            this._ps.publish('PUBSUB.GatewayServers', 'http://' + CommonShuffleLibraries.IPs.get_gatewayIP() + ':' + port);
        }));
        this._ps.publish('PUBSUB.GatewayServers', 'http://' + CommonShuffleLibraries.IPs.get_gatewayIP() + ':' + port);
    }));
    queueManager = new CommonShuffleLibraries.QueueManager(myName, new CommonShuffleLibraries.QueueManagerOptions([ new CommonShuffleLibraries.QueueWatcher('GatewayServer', ss.Delegate.create(this, this._messageReceived)), new CommonShuffleLibraries.QueueWatcher(myName, ss.Delegate.create(this, this._messageReceived)) ], [ 'SiteServer', 'GameServer*', 'DebugServer', 'ChatServer', 'HeadServer' ]));
    io.sockets.on('connection', ss.Delegate.create(this, function(socket) {
        var user = null;
        socket.on('Gateway.Message', function(data) {
            var channel = 'Bad';
            switch (data.channel.split('.')[1]) {
                case 'Game':
                    channel = 'GameServer';
                    break;
                case 'Site':
                    channel = 'SiteServer';
                    break;
                case 'Debug':
                    channel = 'GameServer';
                    break;
                case 'Debug2':
                    channel = 'DebugServer';
                    break;
                case 'Chat':
                    channel = 'ChatServer';
                    break;
            }
            queueManager.sendMessage(user, data.gameServer || channel, data.channel, data.content);
        });
        socket.on('Gateway.Login', ss.Delegate.create(this, function(data) {
            user = new CommonShuffleLibraries.User();
            user.socket = socket;
            user.userName = data.userName;
            this.users[data.userName] = user;
        }));
        socket.on('disconnect', ss.Delegate.create(this, function(data) {
            delete this.users[user.userName];
        }));
    }));
}
GatewayServer.GatewayServer.prototype = {
    _ps: null,
    
    _messageReceived: function GatewayServer_GatewayServer$_messageReceived(gateway, user, eventChannel, content) {
        /// <param name="gateway" type="String">
        /// </param>
        /// <param name="user" type="CommonShuffleLibraries.User">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="Object">
        /// </param>
        if (Object.keyExists(this.users, user.userName)) {
            var u = this.users[user.userName];
            u.socket.emit('Client.Message', new GatewayServer.SocketClientMessage(user, eventChannel, content));
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// GatewayServer.SocketClientMessage

GatewayServer.SocketClientMessage = function GatewayServer_SocketClientMessage(user, channel, content) {
    /// <param name="user" type="CommonShuffleLibraries.User">
    /// </param>
    /// <param name="channel" type="String">
    /// </param>
    /// <param name="content" type="Object">
    /// </param>
    /// <field name="user" type="CommonShuffleLibraries.User">
    /// </field>
    /// <field name="channel" type="String">
    /// </field>
    /// <field name="content" type="Object">
    /// </field>
    this.user = user;
    this.channel = channel;
    this.content = content;
}
GatewayServer.SocketClientMessage.prototype = {
    user: null,
    channel: null,
    content: null
}


GatewayServer.GatewayLoginMessage.registerClass('GatewayServer.GatewayLoginMessage');
GatewayServer.GatewayMessage.registerClass('GatewayServer.GatewayMessage');
GatewayServer.GatewayServer.registerClass('GatewayServer.GatewayServer');
GatewayServer.SocketClientMessage.registerClass('GatewayServer.SocketClientMessage');
})();

//! This script was generated using Script# v0.7.4.0
