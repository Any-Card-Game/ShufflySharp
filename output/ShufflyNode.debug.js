//! ShufflyNode.debug.js
//

(function() {

Type.registerNamespace('ShufflyNode.Common');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.IPs

ShufflyNode.Common.IPs = function ShufflyNode_Common_IPs() {
}
ShufflyNode.Common.IPs.get_gatewayIP = function ShufflyNode_Common_IPs$get_gatewayIP() {
    /// <value type="String"></value>
    return '';
}


Type.registerNamespace('ShufflyNode.GameServer');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.PubSub

ShufflyNode.GameServer.PubSub = function ShufflyNode_GameServer_PubSub(started) {
    /// <param name="started" type="Function">
    /// </param>
    var redis = require('redis');
}
ShufflyNode.GameServer.PubSub.prototype = {
    
    publish: function ShufflyNode_GameServer_PubSub$publish(pubsubGatewayservers, s) {
        /// <param name="pubsubGatewayservers" type="String">
        /// </param>
        /// <param name="s" type="String">
        /// </param>
    },
    
    subscribe: function ShufflyNode_GameServer_PubSub$subscribe(pubsubGatewayserversPing, action) {
        /// <param name="pubsubGatewayserversPing" type="String">
        /// </param>
        /// <param name="action" type="System.Action`1">
        /// </param>
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.QueueManager

ShufflyNode.GameServer.QueueManager = function ShufflyNode_GameServer_QueueManager(gatewayIndex, queueManagerOptions) {
    /// <param name="gatewayIndex" type="String">
    /// </param>
    /// <param name="queueManagerOptions" type="ShufflyNode.GameServer.QueueManagerOptions">
    /// </param>
}
ShufflyNode.GameServer.QueueManager.prototype = {
    
    sendMessage: function ShufflyNode_GameServer_QueueManager$sendMessage(user, s, content) {
        /// <param name="user" type="ShufflyNode.GameServer.User">
        /// </param>
        /// <param name="s" type="String">
        /// </param>
        /// <param name="content" type="String">
        /// </param>
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.QueueManagerOptions

ShufflyNode.GameServer.QueueManagerOptions = function ShufflyNode_GameServer_QueueManagerOptions(queueManagerWatchers, strings) {
    /// <param name="queueManagerWatchers" type="Array" elementType="QueueManagerWatcher">
    /// </param>
    /// <param name="strings" type="Array" elementType="String">
    /// </param>
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.QueueManagerWatcher

ShufflyNode.GameServer.QueueManagerWatcher = function ShufflyNode_GameServer_QueueManagerWatcher(queue, callback) {
    /// <param name="queue" type="String">
    /// </param>
    /// <param name="callback" type="System.Action`4">
    /// </param>
    /// <field name="_callback" type="System.Action`4">
    /// </field>
    /// <field name="_queueName" type="String">
    /// </field>
    this._queueName = queue;
    this._callback = callback;
}
ShufflyNode.GameServer.QueueManagerWatcher.prototype = {
    _callback: null,
    _queueName: null,
    
    get_queueName: function ShufflyNode_GameServer_QueueManagerWatcher$get_queueName() {
        /// <value type="String"></value>
        return this._queueName;
    },
    set_queueName: function ShufflyNode_GameServer_QueueManagerWatcher$set_queueName(value) {
        /// <value type="String"></value>
        this._queueName = value;
        return value;
    },
    
    get_callback: function ShufflyNode_GameServer_QueueManagerWatcher$get_callback() {
        /// <value type="System.Action`4"></value>
        return this._callback;
    },
    set_callback: function ShufflyNode_GameServer_QueueManagerWatcher$set_callback(value) {
        /// <value type="System.Action`4"></value>
        this._callback = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.User

ShufflyNode.GameServer.User = function ShufflyNode_GameServer_User() {
    /// <field name="_userName" type="String">
    /// </field>
    /// <field name="_socket" type="SocketIO.SocketIOConnection">
    /// </field>
}
ShufflyNode.GameServer.User.prototype = {
    _userName: null,
    _socket: null,
    
    get_socket: function ShufflyNode_GameServer_User$get_socket() {
        /// <value type="SocketIO.SocketIOConnection"></value>
        return this._socket;
    },
    set_socket: function ShufflyNode_GameServer_User$set_socket(value) {
        /// <value type="SocketIO.SocketIOConnection"></value>
        this._socket = value;
        return value;
    },
    
    get_userName: function ShufflyNode_GameServer_User$get_userName() {
        /// <value type="String"></value>
        return this._userName;
    },
    set_userName: function ShufflyNode_GameServer_User$set_userName(value) {
        /// <value type="String"></value>
        this._userName = value;
        return value;
    }
}


Type.registerNamespace('ShufflyNode');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GatewayLoginMessage

ShufflyNode.GatewayLoginMessage = function ShufflyNode_GatewayLoginMessage() {
    /// <field name="userName" type="String">
    /// </field>
    /// <field name="password" type="String">
    /// </field>
}
ShufflyNode.GatewayLoginMessage.prototype = {
    userName: null,
    password: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GatewayMessage

ShufflyNode.GatewayMessage = function ShufflyNode_GatewayMessage() {
    /// <field name="channel" type="String">
    /// </field>
    /// <field name="content" type="String">
    /// </field>
    /// <field name="gameServer" type="String">
    /// </field>
}
ShufflyNode.GatewayMessage.prototype = {
    channel: null,
    content: null,
    gameServer: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.SocketClientMessage

ShufflyNode.SocketClientMessage = function ShufflyNode_SocketClientMessage(user, channel, content) {
    /// <param name="user" type="ShufflyNode.GameServer.User">
    /// </param>
    /// <param name="channel" type="String">
    /// </param>
    /// <param name="content" type="String">
    /// </param>
    /// <field name="user" type="ShufflyNode.GameServer.User">
    /// </field>
    /// <field name="channel" type="String">
    /// </field>
    /// <field name="content" type="String">
    /// </field>
    this.user = user;
    this.channel = channel;
    this.content = content;
}
ShufflyNode.SocketClientMessage.prototype = {
    user: null,
    channel: null,
    content: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GatewayServer

ShufflyNode.GatewayServer = function ShufflyNode_GatewayServer() {
    /// <field name="users" type="Object">
    /// </field>
    /// <field name="_ps" type="ShufflyNode.GameServer.PubSub">
    /// </field>
    this.users = {};
    var http = require('http');
    var app = http.createServer(function(req, res) {
        res.end();
    });
    var io = require('socket.io').listen(app);
    var fs = require('fs');
    var guid = new ShufflyNode.Libs.Guid();
    var queueManager;
    var port = 1800 + parseInt((Math.random() * 4000));
    app.listen(port);
    io.set('log lvl', 1);
    var myName = 'Gateway ' + guid.newGuid();
    this._ps = new ShufflyNode.GameServer.PubSub(ss.Delegate.create(this, function() {
        this._ps.subscribe('PUBSUB.GatewayServers.Ping', ss.Delegate.create(this, function(message) {
            this._ps.publish('PUBSUB.GatewayServers', 'http://' + ShufflyNode.Common.IPs.get_gatewayIP() + ':' + port);
        }));
        this._ps.publish('PUBSUB.GatewayServers', 'http://' + ShufflyNode.Common.IPs.get_gatewayIP() + ':' + port);
    }));
    queueManager = new ShufflyNode.GameServer.QueueManager(myName, new ShufflyNode.GameServer.QueueManagerOptions([ new ShufflyNode.GameServer.QueueManagerWatcher('GatewayServer', ss.Delegate.create(this, this._messageReceived)), new ShufflyNode.GameServer.QueueManagerWatcher(myName, ss.Delegate.create(this, this._messageReceived)) ], [ 'SiteServer', 'GameServer*', 'DebugServer', 'ChatServer', 'HeadServer' ]));
    io.get_sockets().emit('connection', ss.Delegate.create(this, function(socket) {
        var user = null;
        socket.emit('Gateway.Message', function(data) {
            var channel = 'Bad';
            switch (data.channel.split('.')[0]) {
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
            queueManager.sendMessage(user, data.gameServer || channel, data.content);
        });
        socket.emit('Gateway.Login', ss.Delegate.create(this, function(data) {
            user = new ShufflyNode.GameServer.User();
            user.set_socket(socket);
            user.set_userName(data.userName);
            this.users[data.userName] = user;
        }));
        socket.emit('disconnect', ss.Delegate.create(this, function(data) {
            delete this.users[user.get_userName()];
        }));
    }));
}
ShufflyNode.GatewayServer.prototype = {
    _ps: null,
    
    _messageReceived: function ShufflyNode_GatewayServer$_messageReceived(gateway, user, eventChannel, content) {
        /// <param name="gateway" type="String">
        /// </param>
        /// <param name="user" type="ShufflyNode.GameServer.User">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="String">
        /// </param>
        if (Object.keyExists(this.users, user.get_userName())) {
            var u = this.users[user.get_userName()];
            u.get_socket().emit('Client.Message', new ShufflyNode.SocketClientMessage(user, eventChannel, content));
        }
    }
}


Type.registerNamespace('ShufflyNode.Libs');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Libs.FS

ShufflyNode.Libs.FS = function ShufflyNode_Libs_FS() {
    ShufflyNode.Libs.FS.initializeBase(this);
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Libs.Guid

ShufflyNode.Libs.Guid = function ShufflyNode_Libs_Guid() {
    ShufflyNode.Libs.Guid.initializeBase(this);
}
ShufflyNode.Libs.Guid.prototype = {
    
    newGuid: function ShufflyNode_Libs_Guid$newGuid() {
        /// <returns type="String"></returns>
        var guid = '';
        for (var i = 0; i < 25; i++) {
            guid += ((Math.random() * 26 + 65));
        }
        return guid;
    }
}


ShufflyNode.Common.IPs.registerClass('ShufflyNode.Common.IPs');
ShufflyNode.GameServer.PubSub.registerClass('ShufflyNode.GameServer.PubSub');
ShufflyNode.GameServer.QueueManager.registerClass('ShufflyNode.GameServer.QueueManager');
ShufflyNode.GameServer.QueueManagerOptions.registerClass('ShufflyNode.GameServer.QueueManagerOptions');
ShufflyNode.GameServer.QueueManagerWatcher.registerClass('ShufflyNode.GameServer.QueueManagerWatcher');
ShufflyNode.GameServer.User.registerClass('ShufflyNode.GameServer.User');
ShufflyNode.GatewayLoginMessage.registerClass('ShufflyNode.GatewayLoginMessage');
ShufflyNode.GatewayMessage.registerClass('ShufflyNode.GatewayMessage');
ShufflyNode.SocketClientMessage.registerClass('ShufflyNode.SocketClientMessage');
ShufflyNode.GatewayServer.registerClass('ShufflyNode.GatewayServer');
ShufflyNode.Libs.FS.registerClass('ShufflyNode.Libs.FS', NodeJS.NodeModule);
ShufflyNode.Libs.Guid.registerClass('ShufflyNode.Libs.Guid', NodeJS.NodeModule);
})();

//! This script was generated using Script# v0.7.4.0
