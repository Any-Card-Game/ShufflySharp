//! ShufflyNode.debug.js
//

(function() {

Type.registerNamespace('ShufflyNode.Libs');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Libs.Guid

ShufflyNode.Libs.Guid = function ShufflyNode_Libs_Guid() {
}
ShufflyNode.Libs.Guid.newGuid = function ShufflyNode_Libs_Guid$newGuid() {
    /// <returns type="String"></returns>
    var guid = '';
    for (var i = 0; i < 25; i++) {
        guid += ((Math.random() * 26 + 65));
    }
    return guid;
}


Type.registerNamespace('ShufflyNode.Common');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.IPs

ShufflyNode.Common.IPs = function ShufflyNode_Common_IPs() {
}
ShufflyNode.Common.IPs.get_gatewayIP = function ShufflyNode_Common_IPs$get_gatewayIP() {
    /// <value type="String"></value>
    return '';
}
ShufflyNode.Common.IPs.get_redisIP = function ShufflyNode_Common_IPs$get_redisIP() {
    /// <value type="String"></value>
    return '';
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.PubSub

ShufflyNode.Common.PubSub = function ShufflyNode_Common_PubSub(ready) {
    /// <param name="ready" type="Function">
    /// </param>
    /// <field name="_subbed" type="Object">
    /// </field>
    /// <field name="_sready" type="Boolean">
    /// </field>
    /// <field name="_pready" type="Boolean">
    /// </field>
    /// <field name="_subClient" type="Redis.RedisClient">
    /// </field>
    /// <field name="_pubClient" type="Redis.RedisClient">
    /// </field>
    this._subbed = {};
    var redis = require('redis');
    redis.debug_mode = false;
    this._subClient = redis.createClient(6379, ShufflyNode.Common.IPs.get_redisIP());
    this._pubClient = redis.createClient(6379, ShufflyNode.Common.IPs.get_redisIP());
    this._subClient.on('subscribe', function(channel, count) {
        console.log('subscribed: ' + channel + ' ' + count);
    });
    this._subClient.on('unsubscribe', function(channel, count) {
        console.log('unsubscribed: ' + channel + ' ' + count);
    });
    this._subClient.on('message', ss.Delegate.create(this, function(channel, message) {
        if (Object.keyExists(this._subbed, channel)) {
            this._subbed[channel];
        }
    }));
    this._subClient.on('ready', ss.Delegate.create(this, function() {
        this._sready = true;
        if (this._sready && this._pready) {
            ready();
        }
    }));
    this._pubClient.on('ready', ss.Delegate.create(this, function() {
        this._pready = true;
        if (this._sready && this._pready) {
            ready();
        }
    }));
}
ShufflyNode.Common.PubSub.prototype = {
    _sready: false,
    _pready: false,
    _subClient: null,
    _pubClient: null,
    
    publish: function ShufflyNode_Common_PubSub$publish(channel, content) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="content" type="String">
        /// </param>
        this._pubClient.publish(channel, content);
    },
    
    subscribe: function ShufflyNode_Common_PubSub$subscribe(channel, callback) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="callback" type="System.Action`1">
        /// </param>
        this._subClient.subscribe(channel);
        this._subbed[channel] = callback;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.QueueItem

ShufflyNode.Common.QueueItem = function ShufflyNode_Common_QueueItem() {
    /// <field name="_channel" type="String">
    /// </field>
}
ShufflyNode.Common.QueueItem.prototype = {
    _channel: null,
    
    get_channel: function ShufflyNode_Common_QueueItem$get_channel() {
        /// <value type="String"></value>
        return this._channel;
    },
    set_channel: function ShufflyNode_Common_QueueItem$set_channel(value) {
        /// <value type="String"></value>
        this._channel = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common._queueItemCollection

ShufflyNode.Common._queueItemCollection = function ShufflyNode_Common__queueItemCollection(queueItems) {
    /// <param name="queueItems" type="System.Collections.Generic.IEnumerable">
    /// </param>
    /// <field name="_queueItems" type="System.Collections.Generic.IEnumerable">
    /// </field>
    this._queueItems = queueItems;
}
ShufflyNode.Common._queueItemCollection.prototype = {
    _queueItems: null,
    
    getByChannel: function ShufflyNode_Common__queueItemCollection$getByChannel(channel) {
        /// <param name="channel" type="String">
        /// </param>
        /// <returns type="ShufflyNode.Common.QueueItem"></returns>
        var $enum1 = ss.IEnumerator.getEnumerator(this._queueItems);
        while ($enum1.moveNext()) {
            var queueWatcher = $enum1.current;
            if (queueWatcher.get_channel() === channel || !channel.indexOf(queueWatcher.get_channel().replaceAll('*', ''))) {
                return queueWatcher;
            }
        }
        return null;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.QueueManager

ShufflyNode.Common.QueueManager = function ShufflyNode_Common_QueueManager(name, options) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="options" type="ShufflyNode.Common.QueueManagerOptions">
    /// </param>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="channels" type="Object">
    /// </field>
    /// <field name="qw" type="Array">
    /// </field>
    /// <field name="qp" type="Array">
    /// </field>
    /// <field name="_qwCollection" type="ShufflyNode.Common._queueItemCollection">
    /// </field>
    /// <field name="_qpCollection" type="ShufflyNode.Common._queueItemCollection">
    /// </field>
    this.name = name;
    this.channels = {};
    this.qw = [];
    this.qp = [];
    var $enum1 = ss.IEnumerator.getEnumerator(options.get_watchers());
    while ($enum1.moveNext()) {
        var queueWatcher = $enum1.current;
        if (queueWatcher.get_callback() == null) {
            queueWatcher.set_callback(ss.Delegate.create(this, this._messageReceived));
        }
        this.qw.add(queueWatcher);
    }
    this.qw.addRange(options.get_watchers());
    var $enum2 = ss.IEnumerator.getEnumerator(options.get_pushers());
    while ($enum2.moveNext()) {
        var pusher = $enum2.current;
        this.qp.add(new ShufflyNode.Common.QueuePusher(pusher));
    }
    this._qwCollection = new ShufflyNode.Common._queueItemCollection((this.qw));
    this._qpCollection = new ShufflyNode.Common._queueItemCollection((this.qp));
}
ShufflyNode.Common.QueueManager.prototype = {
    name: null,
    channels: null,
    qw: null,
    qp: null,
    
    addChannel: function ShufflyNode_Common_QueueManager$addChannel(channel, callback) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="callback" type="System.Action`2">
        /// </param>
        this.channels[channel] = callback;
    },
    
    _messageReceived: function ShufflyNode_Common_QueueManager$_messageReceived(name, user, eventChannel, content) {
        /// <param name="name" type="String">
        /// </param>
        /// <param name="user" type="ShufflyNode.Common.User">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="String">
        /// </param>
        if (Object.keyExists(this.channels, eventChannel)) {
            this.channels[eventChannel];
        }
    },
    
    _qwCollection: null,
    _qpCollection: null,
    
    sendMessage: function ShufflyNode_Common_QueueManager$sendMessage(user, channel, eventChannel, content) {
        /// <param name="user" type="ShufflyNode.Common.User">
        /// </param>
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="String">
        /// </param>
        if (this._qpCollection.getByChannel(channel) == null) {
            console.log(channel + ' No Existy');
            return;
        }
        (this._qpCollection.getByChannel(channel)).message(channel, this.name, user, eventChannel, content);
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.QueueManagerOptions

ShufflyNode.Common.QueueManagerOptions = function ShufflyNode_Common_QueueManagerOptions(watchers, pushers) {
    /// <param name="watchers" type="Array" elementType="QueueWatcher">
    /// </param>
    /// <param name="pushers" type="Array" elementType="String">
    /// </param>
    /// <field name="_pushers" type="Array" elementType="String">
    /// </field>
    /// <field name="_watchers" type="Array" elementType="QueueWatcher">
    /// </field>
    this.set_pushers(pushers);
    this.set_watchers(watchers);
}
ShufflyNode.Common.QueueManagerOptions.prototype = {
    _pushers: null,
    
    get_pushers: function ShufflyNode_Common_QueueManagerOptions$get_pushers() {
        /// <value type="Array" elementType="String"></value>
        return this._pushers;
    },
    set_pushers: function ShufflyNode_Common_QueueManagerOptions$set_pushers(value) {
        /// <value type="Array" elementType="String"></value>
        this._pushers = value;
        return value;
    },
    
    _watchers: null,
    
    get_watchers: function ShufflyNode_Common_QueueManagerOptions$get_watchers() {
        /// <value type="Array" elementType="QueueWatcher"></value>
        return this._watchers;
    },
    set_watchers: function ShufflyNode_Common_QueueManagerOptions$set_watchers(value) {
        /// <value type="Array" elementType="QueueWatcher"></value>
        this._watchers = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.QueueWatcher

ShufflyNode.Common.QueueWatcher = function ShufflyNode_Common_QueueWatcher(queue, callback) {
    /// <param name="queue" type="String">
    /// </param>
    /// <param name="callback" type="System.Action`4">
    /// </param>
    /// <field name="_callback$1" type="System.Action`4">
    /// </field>
    /// <field name="_client1$1" type="Redis.RedisClient">
    /// </field>
    ShufflyNode.Common.QueueWatcher.initializeBase(this);
    this.set_channel(queue);
    this._callback$1 = callback;
    var redis = require('redis');
    this._client1$1 = redis.createClient(6379, ShufflyNode.Common.IPs.get_redisIP());
    this.cycle(queue);
}
ShufflyNode.Common.QueueWatcher.prototype = {
    _callback$1: null,
    _client1$1: null,
    
    get_callback: function ShufflyNode_Common_QueueWatcher$get_callback() {
        /// <value type="System.Action`4"></value>
        return this._callback$1;
    },
    set_callback: function ShufflyNode_Common_QueueWatcher$set_callback(value) {
        /// <value type="System.Action`4"></value>
        this._callback$1 = value;
        return value;
    },
    
    cycle: function ShufflyNode_Common_QueueWatcher$cycle(channel) {
        /// <param name="channel" type="String">
        /// </param>
        this._client1$1.blpop([ channel, 0 ], ss.Delegate.create(this, function(caller, data) {
            if (data != null) {
                var dt = JSON.parse(data);
                this.get_callback()(dt.get_name(), dt.get_user(), dt.get_eventChannel(), dt.get_content());
            }
            this.cycle(channel);
        }));
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.QueuePusher

ShufflyNode.Common.QueuePusher = function ShufflyNode_Common_QueuePusher(pusher) {
    /// <param name="pusher" type="String">
    /// </param>
    /// <field name="_client1$1" type="Redis.RedisClient">
    /// </field>
    ShufflyNode.Common.QueuePusher.initializeBase(this);
    var redis = require('redis');
    this.set_channel(pusher);
    this._client1$1 = redis.createClient(6379, ShufflyNode.Common.IPs.get_redisIP());
}
ShufflyNode.Common.QueuePusher.prototype = {
    _client1$1: null,
    
    message: function ShufflyNode_Common_QueuePusher$message(channel, name, user, eventChannel, content) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="name" type="String">
        /// </param>
        /// <param name="user" type="ShufflyNode.Common.User">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="String">
        /// </param>
        this._client1$1.rpush(channel, JSON.stringify(new ShufflyNode.Common.QueueMessage(name, user, eventChannel, content)));
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.QueueMessage

ShufflyNode.Common.QueueMessage = function ShufflyNode_Common_QueueMessage(name, user, eventChannel, content) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="user" type="ShufflyNode.Common.User">
    /// </param>
    /// <param name="eventChannel" type="String">
    /// </param>
    /// <param name="content" type="String">
    /// </param>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="user" type="ShufflyNode.Common.User">
    /// </field>
    /// <field name="eventChannel" type="String">
    /// </field>
    /// <field name="content" type="String">
    /// </field>
    this.set_name(name);
    this.set_user(user);
    this.set_eventChannel(eventChannel);
    this.set_content(content);
}
ShufflyNode.Common.QueueMessage.prototype = {
    name: null,
    user: null,
    eventChannel: null,
    content: null,
    
    get_name: function ShufflyNode_Common_QueueMessage$get_name() {
        /// <value type="String"></value>
        return this.name;
    },
    set_name: function ShufflyNode_Common_QueueMessage$set_name(value) {
        /// <value type="String"></value>
        this.name = value;
        return value;
    },
    
    get_user: function ShufflyNode_Common_QueueMessage$get_user() {
        /// <value type="ShufflyNode.Common.User"></value>
        return this.user;
    },
    set_user: function ShufflyNode_Common_QueueMessage$set_user(value) {
        /// <value type="ShufflyNode.Common.User"></value>
        this.user = value;
        return value;
    },
    
    get_eventChannel: function ShufflyNode_Common_QueueMessage$get_eventChannel() {
        /// <value type="String"></value>
        return this.eventChannel;
    },
    set_eventChannel: function ShufflyNode_Common_QueueMessage$set_eventChannel(value) {
        /// <value type="String"></value>
        this.eventChannel = value;
        return value;
    },
    
    get_content: function ShufflyNode_Common_QueueMessage$get_content() {
        /// <value type="String"></value>
        return this.content;
    },
    set_content: function ShufflyNode_Common_QueueMessage$set_content(value) {
        /// <value type="String"></value>
        this.content = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.User

ShufflyNode.Common.User = function ShufflyNode_Common_User() {
    /// <field name="_userName" type="String">
    /// </field>
    /// <field name="_socket" type="SocketIO.SocketIOConnection">
    /// </field>
}
ShufflyNode.Common.User.prototype = {
    _userName: null,
    _socket: null,
    
    get_socket: function ShufflyNode_Common_User$get_socket() {
        /// <value type="SocketIO.SocketIOConnection"></value>
        return this._socket;
    },
    set_socket: function ShufflyNode_Common_User$set_socket(value) {
        /// <value type="SocketIO.SocketIOConnection"></value>
        this._socket = value;
        return value;
    },
    
    get_userName: function ShufflyNode_Common_User$get_userName() {
        /// <value type="String"></value>
        return this._userName;
    },
    set_userName: function ShufflyNode_Common_User$set_userName(value) {
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
    /// <param name="user" type="ShufflyNode.Common.User">
    /// </param>
    /// <param name="channel" type="String">
    /// </param>
    /// <param name="content" type="String">
    /// </param>
    /// <field name="user" type="ShufflyNode.Common.User">
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
    /// <field name="_ps" type="ShufflyNode.Common.PubSub">
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
    io.set('log lvl', 1);
    var myName = 'Gateway ' + ShufflyNode.Libs.Guid.newGuid();
    this._ps = new ShufflyNode.Common.PubSub(ss.Delegate.create(this, function() {
        this._ps.subscribe('PUBSUB.GatewayServers.Ping', ss.Delegate.create(this, function(message) {
            this._ps.publish('PUBSUB.GatewayServers', 'http://' + ShufflyNode.Common.IPs.get_gatewayIP() + ':' + port);
        }));
        this._ps.publish('PUBSUB.GatewayServers', 'http://' + ShufflyNode.Common.IPs.get_gatewayIP() + ':' + port);
    }));
    queueManager = new ShufflyNode.Common.QueueManager(myName, new ShufflyNode.Common.QueueManagerOptions([ new ShufflyNode.Common.QueueWatcher('GatewayServer', ss.Delegate.create(this, this._messageReceived)), new ShufflyNode.Common.QueueWatcher(myName, ss.Delegate.create(this, this._messageReceived)) ], [ 'SiteServer', 'GameServer*', 'DebugServer', 'ChatServer', 'HeadServer' ]));
    io.sockets.on('connection', ss.Delegate.create(this, function(socket) {
        var user = null;
        socket.on('Gateway.Message', function(data) {
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
            queueManager.sendMessage(user, data.gameServer || channel, data.channel, data.content);
        });
        socket.on('Gateway.Login', ss.Delegate.create(this, function(data) {
            user = new ShufflyNode.Common.User();
            user.set_socket(socket);
            user.set_userName(data.userName);
            this.users[data.userName] = user;
        }));
        socket.on('disconnect', ss.Delegate.create(this, function(data) {
            delete this.users[user.get_userName()];
        }));
    }));
}
ShufflyNode.GatewayServer.prototype = {
    _ps: null,
    
    _messageReceived: function ShufflyNode_GatewayServer$_messageReceived(gateway, user, eventChannel, content) {
        /// <param name="gateway" type="String">
        /// </param>
        /// <param name="user" type="ShufflyNode.Common.User">
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


ShufflyNode.Libs.Guid.registerClass('ShufflyNode.Libs.Guid');
ShufflyNode.Common.IPs.registerClass('ShufflyNode.Common.IPs');
ShufflyNode.Common.PubSub.registerClass('ShufflyNode.Common.PubSub');
ShufflyNode.Common.QueueItem.registerClass('ShufflyNode.Common.QueueItem');
ShufflyNode.Common._queueItemCollection.registerClass('ShufflyNode.Common._queueItemCollection');
ShufflyNode.Common.QueueManager.registerClass('ShufflyNode.Common.QueueManager');
ShufflyNode.Common.QueueManagerOptions.registerClass('ShufflyNode.Common.QueueManagerOptions');
ShufflyNode.Common.QueueWatcher.registerClass('ShufflyNode.Common.QueueWatcher', ShufflyNode.Common.QueueItem);
ShufflyNode.Common.QueuePusher.registerClass('ShufflyNode.Common.QueuePusher', ShufflyNode.Common.QueueItem);
ShufflyNode.Common.QueueMessage.registerClass('ShufflyNode.Common.QueueMessage');
ShufflyNode.Common.User.registerClass('ShufflyNode.Common.User');
ShufflyNode.GatewayLoginMessage.registerClass('ShufflyNode.GatewayLoginMessage');
ShufflyNode.GatewayMessage.registerClass('ShufflyNode.GatewayMessage');
ShufflyNode.SocketClientMessage.registerClass('ShufflyNode.SocketClientMessage');
ShufflyNode.GatewayServer.registerClass('ShufflyNode.GatewayServer');
})();

//! This script was generated using Script# v0.7.4.0
