//! CommonShuffleLibraries.debug.js
//

(function() {

Type.registerNamespace('CommonShuffleLibraries');

////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.Help

CommonShuffleLibraries.Help = function CommonShuffleLibraries_Help() {
}
CommonShuffleLibraries.Help.sanitize = function CommonShuffleLibraries_Help$sanitize(name, value) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="value" type="Object">
    /// </param>
    /// <returns type="Object"></returns>
    if (Type.getInstanceType(value) === Function) {
        return null;
    }
    if (!!name.indexOf('_') && name.toLowerCase() !== 'socket' && name.toLowerCase() !== 'fiber' && name.toLowerCase() !== 'debuggingsocket') {
        return value;
    }
    return null;
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.IPs

CommonShuffleLibraries.IPs = function CommonShuffleLibraries_IPs() {
}
CommonShuffleLibraries.IPs.get_gatewayIP = function CommonShuffleLibraries_IPs$get_gatewayIP() {
    /// <value type="String"></value>
    return '50.116.22.241';
}
CommonShuffleLibraries.IPs.get_redisIP = function CommonShuffleLibraries_IPs$get_redisIP() {
    /// <value type="String"></value>
    return '50.116.28.16';
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.PubSub

CommonShuffleLibraries.PubSub = function CommonShuffleLibraries_PubSub(ready) {
    /// <param name="ready" type="Function">
    /// </param>
    /// <field name="_subbed" type="Object">
    /// </field>
    /// <field name="_sready" type="Boolean">
    /// </field>
    /// <field name="_pready" type="Boolean">
    /// </field>
    /// <field name="_subClient" type="RedisLibrary.RedisClient">
    /// </field>
    /// <field name="_pubClient" type="RedisLibrary.RedisClient">
    /// </field>
    this._subbed = {};
    var redis = require('redis');
    redis.debug_mode = false;
    this._subClient = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
    this._pubClient = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
    this._subClient.on('subscribe', function(channel, count) {
        global.console.log('subscribed: ' + channel + ' ' + count);
    });
    this._subClient.on('unsubscribe', function(channel, count) {
        global.console.log('unsubscribed: ' + channel + ' ' + count);
    });
    this._subClient.on('message', ss.Delegate.create(this, function(channel, message) {
        if (Object.keyExists(this._subbed, channel)) {
            this._subbed[channel](message);
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
CommonShuffleLibraries.PubSub.prototype = {
    _sready: false,
    _pready: false,
    _subClient: null,
    _pubClient: null,
    
    publish: function CommonShuffleLibraries_PubSub$publish(channel, content) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="content" type="String">
        /// </param>
        this._pubClient.publish(channel, content);
    },
    
    subscribe: function CommonShuffleLibraries_PubSub$subscribe(channel, callback) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="callback" type="System.Action`1">
        /// </param>
        this._subClient.subscribe(channel);
        this._subbed[channel] = callback;
    }
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueItem

CommonShuffleLibraries.QueueItem = function CommonShuffleLibraries_QueueItem() {
    /// <field name="_channel" type="String">
    /// </field>
}
CommonShuffleLibraries.QueueItem.prototype = {
    _channel: null,
    
    get_channel: function CommonShuffleLibraries_QueueItem$get_channel() {
        /// <value type="String"></value>
        return this._channel;
    },
    set_channel: function CommonShuffleLibraries_QueueItem$set_channel(value) {
        /// <value type="String"></value>
        this._channel = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueManager

CommonShuffleLibraries.QueueManager = function CommonShuffleLibraries_QueueManager(name, options) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="options" type="CommonShuffleLibraries.QueueManagerOptions">
    /// </param>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="channels" type="Object">
    /// </field>
    /// <field name="qw" type="Array">
    /// </field>
    /// <field name="qp" type="Array">
    /// </field>
    /// <field name="_qwCollection" type="CommonShuffleLibraries._queueItemCollection">
    /// </field>
    /// <field name="_qpCollection" type="CommonShuffleLibraries._queueItemCollection">
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
        this.qp.add(new CommonShuffleLibraries.QueuePusher(pusher));
    }
    this._qwCollection = new CommonShuffleLibraries._queueItemCollection((this.qw));
    this._qpCollection = new CommonShuffleLibraries._queueItemCollection((this.qp));
}
CommonShuffleLibraries.QueueManager.prototype = {
    name: null,
    channels: null,
    qw: null,
    qp: null,
    
    addChannel: function CommonShuffleLibraries_QueueManager$addChannel(channel, callback) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="callback" type="System.Action`2">
        /// </param>
        this.channels[channel] = callback;
    },
    
    _messageReceived: function CommonShuffleLibraries_QueueManager$_messageReceived(name, user, eventChannel, content) {
        /// <param name="name" type="String">
        /// </param>
        /// <param name="user" type="CommonShuffleLibraries.User">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="Object">
        /// </param>
        user.gateway = name;
        if (Object.keyExists(this.channels, eventChannel)) {
            this.channels[eventChannel](user, content);
        }
    },
    
    _qwCollection: null,
    _qpCollection: null,
    
    sendMessage: function CommonShuffleLibraries_QueueManager$sendMessage(user, channel, eventChannel, content) {
        /// <param name="user" type="CommonShuffleLibraries.User">
        /// </param>
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="Object">
        /// </param>
        if (this._qpCollection.getByChannel(channel) == null) {
            global.console.log(channel + ' No Existy');
            return;
        }
        (this._qpCollection.getByChannel(channel)).message(channel, this.name, user, eventChannel, content);
    }
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueManagerOptions

CommonShuffleLibraries.QueueManagerOptions = function CommonShuffleLibraries_QueueManagerOptions(watchers, pushers) {
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
CommonShuffleLibraries.QueueManagerOptions.prototype = {
    _pushers: null,
    
    get_pushers: function CommonShuffleLibraries_QueueManagerOptions$get_pushers() {
        /// <value type="Array" elementType="String"></value>
        return this._pushers;
    },
    set_pushers: function CommonShuffleLibraries_QueueManagerOptions$set_pushers(value) {
        /// <value type="Array" elementType="String"></value>
        this._pushers = value;
        return value;
    },
    
    _watchers: null,
    
    get_watchers: function CommonShuffleLibraries_QueueManagerOptions$get_watchers() {
        /// <value type="Array" elementType="QueueWatcher"></value>
        return this._watchers;
    },
    set_watchers: function CommonShuffleLibraries_QueueManagerOptions$set_watchers(value) {
        /// <value type="Array" elementType="QueueWatcher"></value>
        this._watchers = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueuePusher

CommonShuffleLibraries.QueuePusher = function CommonShuffleLibraries_QueuePusher(pusher) {
    /// <param name="pusher" type="String">
    /// </param>
    /// <field name="_client1$1" type="RedisLibrary.RedisClient">
    /// </field>
    CommonShuffleLibraries.QueuePusher.initializeBase(this);
    var redis = require('redis');
    this.set_channel(pusher);
    this._client1$1 = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
}
CommonShuffleLibraries.QueuePusher.prototype = {
    _client1$1: null,
    
    message: function CommonShuffleLibraries_QueuePusher$message(channel, name, user, eventChannel, content) {
        /// <param name="channel" type="String">
        /// </param>
        /// <param name="name" type="String">
        /// </param>
        /// <param name="user" type="CommonShuffleLibraries.User">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="Object">
        /// </param>
        this._client1$1.rpush(channel, JSON.stringify(new CommonShuffleLibraries.QueueMessage(name, user, eventChannel, content), CommonShuffleLibraries.Help.sanitize));
    }
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueMessage

CommonShuffleLibraries.QueueMessage = function CommonShuffleLibraries_QueueMessage(name, user, eventChannel, content) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="user" type="CommonShuffleLibraries.User">
    /// </param>
    /// <param name="eventChannel" type="String">
    /// </param>
    /// <param name="content" type="Object">
    /// </param>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="user" type="CommonShuffleLibraries.User">
    /// </field>
    /// <field name="eventChannel" type="String">
    /// </field>
    /// <field name="content" type="Object">
    /// </field>
    this.name = name;
    this.user = user;
    this.eventChannel = eventChannel;
    this.content = content;
}
CommonShuffleLibraries.QueueMessage.prototype = {
    name: null,
    user: null,
    eventChannel: null,
    content: null
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.QueueWatcher

CommonShuffleLibraries.QueueWatcher = function CommonShuffleLibraries_QueueWatcher(queue, callback) {
    /// <param name="queue" type="String">
    /// </param>
    /// <param name="callback" type="System.Action`4">
    /// </param>
    /// <field name="_callback$1" type="System.Action`4">
    /// </field>
    /// <field name="_client1$1" type="RedisLibrary.RedisClient">
    /// </field>
    CommonShuffleLibraries.QueueWatcher.initializeBase(this);
    this.set_channel(queue);
    this._callback$1 = callback;
    var redis = require('redis');
    (redis)['foo'] = 2;
    this._client1$1 = redis.createClient(6379, CommonShuffleLibraries.IPs.get_redisIP());
    this.cycle(queue);
}
CommonShuffleLibraries.QueueWatcher.prototype = {
    _callback$1: null,
    _client1$1: null,
    
    get_callback: function CommonShuffleLibraries_QueueWatcher$get_callback() {
        /// <value type="System.Action`4"></value>
        return this._callback$1;
    },
    set_callback: function CommonShuffleLibraries_QueueWatcher$set_callback(value) {
        /// <value type="System.Action`4"></value>
        this._callback$1 = value;
        return value;
    },
    
    cycle: function CommonShuffleLibraries_QueueWatcher$cycle(channel) {
        /// <param name="channel" type="String">
        /// </param>
        this._client1$1.blpop([ channel, 0 ], ss.Delegate.create(this, function(caller, dtj) {
            var data = dtj;
            if (dtj != null) {
                var dt = JSON.parse(data[1]);
                this.get_callback()(dt.name, dt.user, dt.eventChannel, dt.content);
            }
            this.cycle(channel);
        }));
    }
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries._queueItemCollection

CommonShuffleLibraries._queueItemCollection = function CommonShuffleLibraries__queueItemCollection(queueItems) {
    /// <param name="queueItems" type="System.Collections.Generic.IEnumerable">
    /// </param>
    /// <field name="_queueItems" type="System.Collections.Generic.IEnumerable">
    /// </field>
    this._queueItems = queueItems;
}
CommonShuffleLibraries._queueItemCollection.prototype = {
    _queueItems: null,
    
    getByChannel: function CommonShuffleLibraries__queueItemCollection$getByChannel(channel) {
        /// <param name="channel" type="String">
        /// </param>
        /// <returns type="CommonShuffleLibraries.QueueItem"></returns>
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
// CommonShuffleLibraries.User

CommonShuffleLibraries.User = function CommonShuffleLibraries_User() {
    /// <field name="socket" type="SocketIOLibrary.SocketIOConnection">
    /// </field>
    /// <field name="gateway" type="String">
    /// </field>
    /// <field name="userName" type="String">
    /// </field>
}
CommonShuffleLibraries.User.prototype = {
    socket: null,
    gateway: null,
    userName: null
}


////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibraries.Consumer

CommonShuffleLibraries.Consumer = function CommonShuffleLibraries_Consumer(obj) {
    /// <param name="obj" type="Object">
    /// </param>
    var tf = (this);
    var $enum1 = ss.IEnumerator.getEnumerator(Object.keys(obj));
    while ($enum1.moveNext()) {
        var v = $enum1.current;
        tf[v] = obj[v];
    }
}


CommonShuffleLibraries.Help.registerClass('CommonShuffleLibraries.Help');
CommonShuffleLibraries.IPs.registerClass('CommonShuffleLibraries.IPs');
CommonShuffleLibraries.PubSub.registerClass('CommonShuffleLibraries.PubSub');
CommonShuffleLibraries.QueueItem.registerClass('CommonShuffleLibraries.QueueItem');
CommonShuffleLibraries.QueueManager.registerClass('CommonShuffleLibraries.QueueManager');
CommonShuffleLibraries.QueueManagerOptions.registerClass('CommonShuffleLibraries.QueueManagerOptions');
CommonShuffleLibraries.QueuePusher.registerClass('CommonShuffleLibraries.QueuePusher', CommonShuffleLibraries.QueueItem);
CommonShuffleLibraries.QueueMessage.registerClass('CommonShuffleLibraries.QueueMessage');
CommonShuffleLibraries.QueueWatcher.registerClass('CommonShuffleLibraries.QueueWatcher', CommonShuffleLibraries.QueueItem);
CommonShuffleLibraries._queueItemCollection.registerClass('CommonShuffleLibraries._queueItemCollection');
CommonShuffleLibraries.User.registerClass('CommonShuffleLibraries.User');
CommonShuffleLibraries.Consumer.registerClass('CommonShuffleLibraries.Consumer');
})();

//! This script was generated using Script# v0.7.4.0
