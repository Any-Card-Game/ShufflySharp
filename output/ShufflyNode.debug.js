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
// ShufflyNode.Common.Consumer

ShufflyNode.Common.Consumer = function ShufflyNode_Common_Consumer(obj) {
    /// <param name="obj" type="Object">
    /// </param>
    var tf = (this);
    var $enum1 = ss.IEnumerator.getEnumerator(Object.keys(obj));
    while ($enum1.moveNext()) {
        var v = $enum1.current;
        tf[v] = obj[v];
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.Help

ShufflyNode.Common.Help = function ShufflyNode_Common_Help() {
}
ShufflyNode.Common.Help.sanitize = function ShufflyNode_Common_Help$sanitize(name, value) {
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
// ShufflyNode.Common.IPs

ShufflyNode.Common.IPs = function ShufflyNode_Common_IPs() {
}
ShufflyNode.Common.IPs.get_gatewayIP = function ShufflyNode_Common_IPs$get_gatewayIP() {
    /// <value type="String"></value>
    return '50.116.22.241';
}
ShufflyNode.Common.IPs.get_redisIP = function ShufflyNode_Common_IPs$get_redisIP() {
    /// <value type="String"></value>
    return '50.116.28.16';
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
        /// <param name="content" type="Object">
        /// </param>
        user.gateway = name;
        if (Object.keyExists(this.channels, eventChannel)) {
            this.channels[eventChannel](user, content);
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
    (redis)['foo'] = 2;
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
        /// <param name="content" type="Object">
        /// </param>
        this._client1$1.rpush(channel, JSON.stringify(new ShufflyNode.Common.QueueMessage(name, user, eventChannel, content), ShufflyNode.Common.Help.sanitize));
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
    /// <param name="content" type="Object">
    /// </param>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="user" type="ShufflyNode.Common.User">
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
ShufflyNode.Common.QueueMessage.prototype = {
    name: null,
    user: null,
    eventChannel: null,
    content: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.Common.User

ShufflyNode.Common.User = function ShufflyNode_Common_User() {
    /// <field name="socket" type="SocketIO.SocketIOConnection">
    /// </field>
    /// <field name="gateway" type="String">
    /// </field>
    /// <field name="userName" type="String">
    /// </field>
}
ShufflyNode.Common.User.prototype = {
    socket: null,
    gateway: null,
    userName: null
}


Type.registerNamespace('ShufflyNode.GameServer');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.CreateGameRequest

ShufflyNode.GameServer.CreateGameRequest = function ShufflyNode_GameServer_CreateGameRequest() {
    /// <field name="name" type="String">
    /// </field>
    /// <field name="gameName" type="String">
    /// </field>
}
ShufflyNode.GameServer.CreateGameRequest.prototype = {
    name: null,
    gameName: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.DataManager

ShufflyNode.GameServer.DataManager = function ShufflyNode_GameServer_DataManager() {
    /// <field name="gameData" type="ShufflyNode.GameServer.DataManagerGameData">
    /// </field>
    /// <field name="client" type="MongoDB">
    /// </field>
    /// <field name="_server" type="MongoServer">
    /// </field>
    /// <field name="_connection" type="MongoConnection">
    /// </field>
    this.gameData = new ShufflyNode.GameServer.DataManagerGameData(this);
    var mongo = require('mongodb');
    var Db = mongo.Db;
    this._connection = mongo.Connection;
    var server = this._server = mongo.Server;
    this.client = eval("new Db('test', new server('50.116.28.16', 27017, {}))");
    this.client.open(function() {
    });
}
ShufflyNode.GameServer.DataManager.prototype = {
    gameData: null,
    client: null,
    _server: null,
    _connection: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.DataManagerGameData

ShufflyNode.GameServer.DataManagerGameData = function ShufflyNode_GameServer_DataManagerGameData(manager) {
    /// <param name="manager" type="ShufflyNode.GameServer.DataManager">
    /// </param>
    /// <field name="_manager" type="ShufflyNode.GameServer.DataManager">
    /// </field>
    this._manager = manager;
}
ShufflyNode.GameServer.DataManagerGameData.prototype = {
    _manager: null,
    
    insert: function ShufflyNode_GameServer_DataManagerGameData$insert(gameName, answerIndex) {
        /// <param name="gameName" type="String">
        /// </param>
        /// <param name="answerIndex" type="Number" integer="true">
        /// </param>
        this._manager.client.collection('gameInfo', function(err, collection) {
            var gmo = new ShufflyNode.GameServer.GameInfoObject();
            gmo.gameName = gameName;
            gmo.answerIndex = answerIndex;
            collection.insert(gmo);
        });
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.GameInfoObject

ShufflyNode.GameServer.GameInfoObject = function ShufflyNode_GameServer_GameInfoObject() {
    /// <field name="gameName" type="String">
    /// </field>
    /// <field name="answerIndex" type="Number" integer="true">
    /// </field>
}
ShufflyNode.GameServer.GameInfoObject.prototype = {
    gameName: null,
    answerIndex: 0
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.FiberYieldResponse

ShufflyNode.GameServer.FiberYieldResponse = function ShufflyNode_GameServer_FiberYieldResponse() {
    /// <field name="type" type="String">
    /// </field>
    /// <field name="question" type="ShufflyNode.GameServer.GameQuestionAnswer">
    /// </field>
    /// <field name="contents" type="Number" integer="true">
    /// </field>
    /// <field name="lineNumber" type="Number" integer="true">
    /// </field>
}
ShufflyNode.GameServer.FiberYieldResponse.prototype = {
    type: null,
    question: null,
    contents: 0,
    lineNumber: 0
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.GameAnswerRequest

ShufflyNode.GameServer.GameAnswerRequest = function ShufflyNode_GameServer_GameAnswerRequest() {
    /// <field name="answerIndex" type="Number" integer="true">
    /// </field>
    /// <field name="roomID" type="String">
    /// </field>
}
ShufflyNode.GameServer.GameAnswerRequest.prototype = {
    answerIndex: 0,
    roomID: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.GameData

ShufflyNode.GameServer.GameData = function ShufflyNode_GameServer_GameData() {
    /// <field name="totalGames" type="Number" integer="true">
    /// </field>
    /// <field name="totalQuestionsAnswered" type="Number" integer="true">
    /// </field>
    /// <field name="totalPlayers" type="Number" integer="true">
    /// </field>
    /// <field name="finishedGames" type="Number" integer="true">
    /// </field>
}
ShufflyNode.GameServer.GameData.prototype = {
    totalGames: 0,
    totalQuestionsAnswered: 0,
    totalPlayers: 0,
    finishedGames: 0,
    
    toString: function ShufflyNode_GameServer_GameData$toString() {
        /// <returns type="String"></returns>
        return 'Total: ' + this.totalGames + '\n Running: ' + this._runningGames() + '\n Total Players: ' + this.totalPlayers + '\n Answered: ' + this.totalQuestionsAnswered;
    },
    
    _runningGames: function ShufflyNode_GameServer_GameData$_runningGames() {
        /// <returns type="Number" integer="true"></returns>
        return this.totalGames - this.finishedGames;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.GameQuestionAnswer

ShufflyNode.GameServer.GameQuestionAnswer = function ShufflyNode_GameServer_GameQuestionAnswer() {
    /// <field name="user" type="ShufflyNode.Common.User">
    /// </field>
    /// <field name="question" type="String">
    /// </field>
    /// <field name="answers" type="Array" elementType="String">
    /// </field>
    /// <field name="cardGame" type="ShufflyGame.GameCardGame">
    /// </field>
}
ShufflyNode.GameServer.GameQuestionAnswer.prototype = {
    user: null,
    question: null,
    answers: null,
    cardGame: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.GameRoom

ShufflyNode.GameServer.GameRoom = function ShufflyNode_GameServer_GameRoom() {
    /// <field name="name" type="String">
    /// </field>
    /// <field name="gameName" type="String">
    /// </field>
    /// <field name="debuggable" type="Boolean">
    /// </field>
    /// <field name="maxUsers" type="Number" integer="true">
    /// </field>
    /// <field name="players" type="Array">
    /// </field>
    /// <field name="answers" type="Array">
    /// </field>
    /// <field name="roomID" type="String">
    /// </field>
    /// <field name="gameServer" type="String">
    /// </field>
    /// <field name="started" type="Boolean">
    /// </field>
    /// <field name="fiber" type="Fiber">
    /// </field>
    /// <field name="unwind" type="System.Action`1">
    /// </field>
    /// <field name="game" type="ShufflyGame.GameObject">
    /// </field>
    /// <field name="debuggingSender" type="ShufflyNode.Common.User">
    /// </field>
}
ShufflyNode.GameServer.GameRoom.prototype = {
    name: null,
    gameName: null,
    debuggable: false,
    maxUsers: 0,
    players: null,
    answers: null,
    roomID: null,
    gameServer: null,
    started: false,
    fiber: null,
    unwind: null,
    game: null,
    debuggingSender: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.GameSendAnswer

ShufflyNode.GameServer.GameSendAnswer = function ShufflyNode_GameServer_GameSendAnswer() {
    /// <field name="question" type="String">
    /// </field>
    /// <field name="answers" type="Array" elementType="String">
    /// </field>
}
ShufflyNode.GameServer.GameSendAnswer.prototype = {
    question: null,
    answers: null
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.GameServer

ShufflyNode.GameServer.GameServer = function ShufflyNode_GameServer_GameServer() {
    /// <field name="_qManager" type="ShufflyNode.Common.QueueManager">
    /// </field>
    /// <field name="_verbose" type="Boolean">
    /// </field>
    /// <field name="_gameData" type="ShufflyNode.GameServer.GameData">
    /// </field>
    /// <field name="_rooms" type="Array">
    /// </field>
    /// <field name="_startTime" type="Date">
    /// </field>
    /// <field name="_cachedGames" type="Object">
    /// </field>
    /// <field name="_requiredShuff" type="ShufflyGame.Shuff">
    /// </field>
    /// <field name="_QUEUEPERTICK" type="Number" integer="true">
    /// </field>
    /// <field name="_total__" type="Number" integer="true">
    /// </field>
    /// <field name="_skipped__" type="Number" integer="true">
    /// </field>
    /// <field name="_dataManager" type="ShufflyNode.GameServer.DataManager">
    /// </field>
    /// <field name="_fs" type="ShufflyNode.Libs.FS">
    /// </field>
    /// <field name="_childProcess" type="NodeJS.ChildProcess">
    /// </field>
    /// <field name="_queueue" type="Array">
    /// </field>
    /// <field name="_gameServerIndex" type="String">
    /// </field>
    this._startTime = new Date();
    this._queueue = [];
    this._fs = require('fs');
    this._childProcess = require('child_process');
    this._dataManager = new ShufflyNode.GameServer.DataManager();
    this._gameServerIndex = 'GameServer' + ShufflyNode.Libs.Guid.newGuid();
    this._cachedGames = {};
    this._requiredShuff = require('./gameFramework/shuff.js');
    this._qManager = new ShufflyNode.Common.QueueManager(this._gameServerIndex, new ShufflyNode.Common.QueueManagerOptions([ new ShufflyNode.Common.QueueWatcher('GameServer', null), new ShufflyNode.Common.QueueWatcher(this._gameServerIndex, null) ], [ 'GameServer', 'GatewayServer', 'Gateway*' ]));
    require('fibers');
    this._rooms = [];
    this._gameData = new ShufflyNode.GameServer.GameData();
    global.process.on('exit', function() {
        global.console.log('exi');
    });
    this._qManager.addChannel('Area.Game.Create', ss.Delegate.create(this, function() {
        var room;
        this._rooms.add(room = new ShufflyNode.GameServer.GameRoom());
    }));
    this._qManager.addChannel('Area.Debug.Create', ss.Delegate.create(this, function(user, arg2) {
        var data = arg2;
        data.gameName = 'Sevens';
        var room;
        this._rooms.add(room = new ShufflyNode.GameServer.GameRoom());
        room.name = data.name;
        room.maxUsers = 6;
        room.debuggable = true;
        room.gameName = data.gameName;
        room.roomID = ShufflyNode.Libs.Guid.newGuid();
        room.answers = [];
        room.players = [];
        room.started = false;
        room.gameServer = this._gameServerIndex;
        room.players.add(user);
        var gameObject;
        if (Object.keyExists(this._cachedGames, data.gameName)) {
            gameObject = this._cachedGames[data.gameName];
        }
        else {
            gameObject = this._cachedGames[data.gameName] = require('./games/' + data.gameName + '/app.js');
        }
        room.fiber = this._createFiber(room, gameObject, true);
        room.unwind = ss.Delegate.create(this, function(players) {
            this._gameData.finishedGames++;
            global.console.log('--game closed');
        });
        this._emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, ShufflyNode.Common.Help.sanitize)));
    }));
    this._qManager.addChannel('Area.Game.Join', ss.Delegate.create(this, function(user, arg2) {
        var data = (arg2);
        var room = null;
        var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
        while ($enum1.moveNext()) {
            var gameRoom = $enum1.current;
            if (gameRoom.roomID === data.roomID) {
                room = gameRoom;
                break;
            }
        }
        if (room == null) {
            return;
        }
        room.players.add(user);
        room.players.add(user);
        this._emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, ShufflyNode.Common.Help.sanitize)));
    }));
    this._qManager.addChannel('Area.Game.GetGames', ss.Delegate.create(this, function(sender, data) {
        this._qManager.sendMessage(sender, sender.gateway, 'Area.Game.RoomInfos', JSON.parse(JSON.stringify(this._rooms, ShufflyNode.Common.Help.sanitize)));
    }));
    this._qManager.addChannel('Area.Game.DebuggerJoin', ss.Delegate.create(this, function(sender, arg2) {
        var data = (arg2);
        var room = null;
        var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
        while ($enum1.moveNext()) {
            var gameRoom = $enum1.current;
            if (gameRoom.roomID === data.roomID) {
                room = gameRoom;
                break;
            }
        }
        if (room == null) {
            return;
        }
        room.debuggingSender = sender;
        global.console.log('debuggable');
    }));
    this._qManager.addChannel('Area.Game.Start', ss.Delegate.create(this, function(sender, arg2) {
        var data = (arg2);
        var room = null;
        var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
        while ($enum1.moveNext()) {
            var gameRoom = $enum1.current;
            if (gameRoom.roomID === data.roomID) {
                room = gameRoom;
                break;
            }
        }
        if (room == null) {
            return;
        }
        this._emitAll(room, 'Area.Game.Started', JSON.parse(JSON.stringify(room, ShufflyNode.Common.Help.sanitize)));
        room.started = true;
        global.console.log('started');
        var answer = room.fiber.run(room.players);
        global.console.log('doign');
        this._handleYield(room, answer);
        global.console.log('doign2');
    }));
    this._qManager.addChannel('Area.Game.AnswerQuestion', ss.Delegate.create(this, function(sender, data) {
        this._queueue.add(data);
    }));
    setInterval(ss.Delegate.create(this, this._flushQueue), 50);
}
ShufflyNode.GameServer.GameServer.prototype = {
    _qManager: null,
    _verbose: false,
    _gameData: null,
    _rooms: null,
    _cachedGames: null,
    _requiredShuff: null,
    _QUEUEPERTICK: 1,
    _total__: 0,
    _skipped__: 0,
    _dataManager: null,
    _fs: null,
    _childProcess: null,
    _gameServerIndex: null,
    
    _flushQueue: function ShufflyNode_GameServer_GameServer$_flushQueue() {
        var ind = 0;
        for (ind = 0; ind < this._QUEUEPERTICK; ind++) {
            if (!this._queueue.length) {
                break;
            }
            var arg2 = this._queueue[0];
            this._queueue.removeAt(0);
            var data = (arg2);
            var room = null;
            var $enum1 = ss.IEnumerator.getEnumerator(this._rooms);
            while ($enum1.moveNext()) {
                var gameRoom = $enum1.current;
                if (gameRoom.roomID === data.roomID) {
                    room = gameRoom;
                    break;
                }
            }
            if (room == null) {
                return;
            }
            var dict = new CommonLibraries.GameAnswer();
            dict.value = data.answerIndex;
            room.answers.add(dict);
            var answ = room.fiber.run(dict);
            if (answ == null) {
                this._emitAll(room, 'Area.Game.GameOver', 'a');
                room.fiber.run();
                this._rooms.remove(room);
                room.unwind(room.players);
                continue;
            }
            this._gameData.totalQuestionsAnswered++;
            this._dataManager.gameData.insert(room.name, answ.contents);
            this._handleYield(room, answ);
        }
        if (!ind) {
            this._skipped__++;
        }
        else {
            this._total__ += ind;
            if (!((this._total__ + this._skipped__) % 20)) {
                global.console.log(this._gameServerIndex.substring(0, 19) + '=  tot: __' + (this._total__ + this._skipped__) + '__ + shift: ' + ind + ' + T: ' + this._total__ + ' + skip: ' + this._skipped__ + ' + QSize: ' + this._queueue.length + ' + T Rooms: ' + this._rooms.length);
            }
        }
    },
    
    _handleYield: function ShufflyNode_GameServer_GameServer$_handleYield(room, answer) {
        /// <param name="room" type="ShufflyNode.GameServer.GameRoom">
        /// </param>
        /// <param name="answer" type="ShufflyNode.GameServer.FiberYieldResponse">
        /// </param>
        switch (answer.type) {
            case 'askQuestion':
                var answ = answer.question;
                if (answ == null) {
                    this._emitAll(room, 'Area.Game.GameOver', '');
                    room.fiber.run();
                    return;
                }
                this._askQuestion(answ, room);
                var dt = new Date();
                var then = dt.getMilliseconds();
                global.console.log(this._gameData.totalQuestionsAnswered / ((dt.getTime() - this._startTime.getTime()) / 1000) + ' Answers per seconds');
                break;
            case 'gameOver':
                this._emitAll(room, 'Area.Game.GameOver', '');
                if (room.debuggingSender != null) {
                    this._qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.GameOver', {});
                }
                break;
            case 'log':
                var answ2 = room.fiber.run();
                this._handleYield(room, answ2);
                if (!room.game.cardGame.emulating && room.debuggable) {
                    var ganswer = new CommonLibraries.GameAnswer();
                    ganswer.value = answer.contents;
                    this._qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Log', ganswer);
                }
                break;
            case 'break':
                if (!room.debuggable) {
                    var answ3 = room.fiber.run();
                    this._handleYield(room, answ3);
                    return;
                }
                if (!room.game.cardGame.emulating) {
                    var ganswer = new CommonLibraries.GameAnswer();
                    ganswer.lineNumber = answer.lineNumber + 2;
                    this._qManager.sendMessage(room.debuggingSender, room.debuggingSender.gateway, 'Area.Debug.Break', ganswer);
                }
                break;
        }
    },
    
    _askQuestion: function ShufflyNode_GameServer_GameServer$_askQuestion(answ, room) {
        /// <param name="answ" type="ShufflyNode.GameServer.GameQuestionAnswer">
        /// </param>
        /// <param name="room" type="ShufflyNode.GameServer.GameRoom">
        /// </param>
        var user = this._getPlayerByUsername(room, answ.user.userName);
        var gameAnswer = new ShufflyNode.GameServer.GameSendAnswer();
        gameAnswer.answers = answ.answers;
        gameAnswer.question = answ.question;
        this._qManager.sendMessage(user, user.gateway, 'Area.Game.AskQuestion', JSON.parse(JSON.stringify(gameAnswer, ShufflyNode.Common.Help.sanitize)));
        this._emitAll(room, 'Area.Game.UpdateState', JSON.parse(JSON.stringify(answ.cardGame, ShufflyNode.Common.Help.sanitize)));
        if (this._verbose) {
            global.console.log(answ.user.userName + ': ' + answ.question + '   ');
            var ind = 0;
            var $enum1 = ss.IEnumerator.getEnumerator(answ.answers);
            while ($enum1.moveNext()) {
                var answer = $enum1.current;
                global.console.log('     ' + ind++ + ': ' + answer);
            }
        }
    },
    
    _getPlayerByUsername: function ShufflyNode_GameServer_GameServer$_getPlayerByUsername(room, userName) {
        /// <param name="room" type="ShufflyNode.GameServer.GameRoom">
        /// </param>
        /// <param name="userName" type="String">
        /// </param>
        /// <returns type="ShufflyNode.Common.User"></returns>
        var $enum1 = ss.IEnumerator.getEnumerator(room.players);
        while ($enum1.moveNext()) {
            var player = $enum1.current;
            if (player.userName === userName) {
                return player;
            }
        }
        return null;
    },
    
    _emitAll: function ShufflyNode_GameServer_GameServer$_emitAll(room, message, val) {
        /// <param name="room" type="ShufflyNode.GameServer.GameRoom">
        /// </param>
        /// <param name="message" type="String">
        /// </param>
        /// <param name="val" type="Object">
        /// </param>
        var $enum1 = ss.IEnumerator.getEnumerator(room.players);
        while ($enum1.moveNext()) {
            var player = $enum1.current;
            this._qManager.sendMessage(player, player.gateway, message, val);
        }
    },
    
    _createFiber: function ShufflyNode_GameServer_GameServer$_createFiber(room, gameObject, emulating) {
        /// <param name="room" type="ShufflyNode.GameServer.GameRoom">
        /// </param>
        /// <param name="gameObject" type="ShufflyGame.GameObject">
        /// </param>
        /// <param name="emulating" type="Boolean">
        /// </param>
        /// <returns type="Fiber"></returns>
        return new Fiber(ss.Delegate.create(this, function(players) {
            if (players == null || !players.length) {
                return true;
            }
            room.players = players;
            global.console.log('game started');
            var sev = null;
            eval('sev= new gameObject();');
            sev.cardGame.emulating = emulating;
            room.game = sev;
            sev.shuff = this._requiredShuff;
            sev.cardGame.setAnswers(room.answers);
            sev.cardGame.setPlayers(players);
            this._gameData.totalGames++;
            this._gameData.totalPlayers += players.length;
            sev.cardGame.answerIndex = 0;
            sev.constructor();
            sev.runGame();
            room.unwind(players);
            return true;
        }));
    }
}


////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GameServer.JoinGameRequest

ShufflyNode.GameServer.JoinGameRequest = function ShufflyNode_GameServer_JoinGameRequest() {
    /// <field name="roomID" type="String">
    /// </field>
}
ShufflyNode.GameServer.JoinGameRequest.prototype = {
    roomID: null
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
    /// <param name="content" type="Object">
    /// </param>
    /// <field name="user" type="ShufflyNode.Common.User">
    /// </field>
    /// <field name="channel" type="String">
    /// </field>
    /// <field name="content" type="Object">
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


Type.registerNamespace('ShufflyNode.HeadServer');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.HeadServer.HeadServer

ShufflyNode.HeadServer.HeadServer = function ShufflyNode_HeadServer_HeadServer() {
    /// <field name="_fs" type="ShufflyNode.Libs.FS">
    /// </field>
    /// <field name="__dirname" type="String">
    /// </field>
    /// <field name="_indexPageData" type="String">
    /// </field>
    /// <field name="_qManager" type="ShufflyNode.Common.QueueManager">
    /// </field>
    /// <field name="_pubsub" type="ShufflyNode.Common.PubSub">
    /// </field>
    /// <field name="_indexForSites" type="Array">
    /// </field>
    /// <field name="_gateways" type="Array">
    /// </field>
    /// <field name="_oldGateways" type="Array">
    /// </field>
    /// <field name="_oldIndex" type="Array">
    /// </field>
    /// <field name="_siteIndex" type="Number" integer="true">
    /// </field>
    this._fs = require('fs');
    this._indexForSites = [];
    this._gateways = [];
    this._oldGateways = [];
    this._oldIndex = [];
    this._qManager = new ShufflyNode.Common.QueueManager('Head1', new ShufflyNode.Common.QueueManagerOptions([ new ShufflyNode.Common.QueueWatcher('HeadServer', null), new ShufflyNode.Common.QueueWatcher('Head1', null) ], [ 'GatewayServer' ]));
    this._fs.readFile(this.__dirname + '/index.html', ss.Delegate.create(this, this.ready));
    this._pubsub = new ShufflyNode.Common.PubSub(ss.Delegate.create(this, function() {
        this._pubsub.subscribe('PUBSUB.GatewayServers', ss.Delegate.create(this, function(message) {
            this._indexForSites.add(this._indexPageData.replaceAll('{{gateway}}', message.toString()));
            this._gateways.add(message.toString());
        }));
    }));
    require('http').createServer(ss.Delegate.create(this, this._handlerWS)).listen(8844);
    this._qManager.addChannel('Head.GatewayUpdate', ss.Delegate.create(this, function(user, data) {
        this._indexForSites.add(this._indexPageData.replaceAll('{{gateway}}', data.toString()));
        this._gateways.add(data.toString());
    }));
    setInterval(ss.Delegate.create(this, this._pollGateways), 5000);
    this._pollGateways();
}
ShufflyNode.HeadServer.HeadServer.prototype = {
    __dirname: '/usr/local/src/headServer',
    _indexPageData: null,
    _qManager: null,
    _pubsub: null,
    _siteIndex: 0,
    
    _pollGateways: function ShufflyNode_HeadServer_HeadServer$_pollGateways() {
        this._pubsub.publish('PUBSUB.GatewayServers.Ping', '');
        if (this._indexForSites.length > 0) {
            this._oldIndex = this._indexForSites;
        }
        if (this._gateways.length > 0) {
            this._oldGateways = this._gateways;
        }
        this._indexForSites = [];
        this._gateways = [];
        this._siteIndex = 0;
    },
    
    _handlerWS: function ShufflyNode_HeadServer_HeadServer$_handlerWS(request, response) {
        /// <param name="request" type="NodeJS.HttpRequest">
        /// </param>
        /// <param name="response" type="NodeJS.HttpResponse">
        /// </param>
        if (this._oldGateways.length > 0) {
            var inj = (this._siteIndex++) % this._oldIndex.length;
            response.end(this._oldGateways[inj]);
            return;
        }
        response.end();
    },
    
    _handler: function ShufflyNode_HeadServer_HeadServer$_handler(request, response) {
        /// <param name="request" type="NodeJS.HttpRequest">
        /// </param>
        /// <param name="response" type="NodeJS.HttpResponse">
        /// </param>
        var dict = {};
        dict['Content-Type'] = 'text/html';
        if (this._oldIndex.length > 0) {
            response.writeHead(200, dict);
            var inj = (this._siteIndex++) % this._oldIndex.length;
            response.end(this._oldIndex[inj]);
        }
        else {
            response.writeHead(200, dict);
            response.end();
        }
    },
    
    ready: function ShufflyNode_HeadServer_HeadServer$ready(error, content) {
        /// <param name="error" type="ShufflyNode.Libs.FileSystemError">
        /// </param>
        /// <param name="content" type="Object">
        /// </param>
        this._indexPageData = content.toString();
        require('http').createServer(ss.Delegate.create(this, this._handler)).listen(80);
    }
}


Type.registerNamespace('ShufflyNode.GatewayServer');

////////////////////////////////////////////////////////////////////////////////
// ShufflyNode.GatewayServer.GatewayServer

ShufflyNode.GatewayServer.GatewayServer = function ShufflyNode_GatewayServer_GatewayServer() {
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
            user = new ShufflyNode.Common.User();
            user.socket = socket;
            user.userName = data.userName;
            this.users[data.userName] = user;
        }));
        socket.on('disconnect', ss.Delegate.create(this, function(data) {
            delete this.users[user.userName];
        }));
    }));
}
ShufflyNode.GatewayServer.GatewayServer.prototype = {
    _ps: null,
    
    _messageReceived: function ShufflyNode_GatewayServer_GatewayServer$_messageReceived(gateway, user, eventChannel, content) {
        /// <param name="gateway" type="String">
        /// </param>
        /// <param name="user" type="ShufflyNode.Common.User">
        /// </param>
        /// <param name="eventChannel" type="String">
        /// </param>
        /// <param name="content" type="Object">
        /// </param>
        if (Object.keyExists(this.users, user.userName)) {
            var u = this.users[user.userName];
            u.socket.emit('Client.Message', new ShufflyNode.SocketClientMessage(user, eventChannel, content));
        }
    }
}


ShufflyNode.Libs.Guid.registerClass('ShufflyNode.Libs.Guid');
ShufflyNode.Common.Consumer.registerClass('ShufflyNode.Common.Consumer');
ShufflyNode.Common.Help.registerClass('ShufflyNode.Common.Help');
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
ShufflyNode.GameServer.CreateGameRequest.registerClass('ShufflyNode.GameServer.CreateGameRequest');
ShufflyNode.GameServer.DataManager.registerClass('ShufflyNode.GameServer.DataManager');
ShufflyNode.GameServer.DataManagerGameData.registerClass('ShufflyNode.GameServer.DataManagerGameData');
ShufflyNode.GameServer.GameInfoObject.registerClass('ShufflyNode.GameServer.GameInfoObject');
ShufflyNode.GameServer.FiberYieldResponse.registerClass('ShufflyNode.GameServer.FiberYieldResponse');
ShufflyNode.GameServer.GameAnswerRequest.registerClass('ShufflyNode.GameServer.GameAnswerRequest');
ShufflyNode.GameServer.GameData.registerClass('ShufflyNode.GameServer.GameData');
ShufflyNode.GameServer.GameQuestionAnswer.registerClass('ShufflyNode.GameServer.GameQuestionAnswer');
ShufflyNode.GameServer.GameRoom.registerClass('ShufflyNode.GameServer.GameRoom');
ShufflyNode.GameServer.GameSendAnswer.registerClass('ShufflyNode.GameServer.GameSendAnswer');
ShufflyNode.GameServer.GameServer.registerClass('ShufflyNode.GameServer.GameServer');
ShufflyNode.GameServer.JoinGameRequest.registerClass('ShufflyNode.GameServer.JoinGameRequest');
ShufflyNode.GatewayLoginMessage.registerClass('ShufflyNode.GatewayLoginMessage');
ShufflyNode.GatewayMessage.registerClass('ShufflyNode.GatewayMessage');
ShufflyNode.SocketClientMessage.registerClass('ShufflyNode.SocketClientMessage');
ShufflyNode.HeadServer.HeadServer.registerClass('ShufflyNode.HeadServer.HeadServer');
ShufflyNode.GatewayServer.GatewayServer.registerClass('ShufflyNode.GatewayServer.GatewayServer');
})();

//! This script was generated using Script# v0.7.4.0
