require('./mscorlib.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
////////////////////////////////////////////////////////////////////////////////
// ChatServer.ChatCreateRoomModel
var $ChatServer_ChatCreateRoomModel = function() {
};
$ChatServer_ChatCreateRoomModel.$ctor = function(channel) {
	var $this = {};
	$this.channel = null;
	$this.channel = channel;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ChatServer.ChatJoinRoomModel
var $ChatServer_ChatJoinRoomModel = function() {
};
$ChatServer_ChatJoinRoomModel.$ctor = function(channel) {
	var $this = {};
	$this.channel = null;
	$this.channel = channel;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ChatServer.ChatMessageRoomModel
var $ChatServer_ChatMessageRoomModel = function() {
};
$ChatServer_ChatMessageRoomModel.$ctor = function(channel, user, content) {
	var $this = {};
	$this.channel = null;
	$this.user = null;
	$this.content = null;
	$this.channel = channel;
	$this.user = user;
	$this.content = content;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ChatServer.ChatServer
var $ChatServer_ChatServer = function() {
	this.$client = null;
	this.$registeredChannels = {};
	var queueManager = new CommonShuffleLibrary.QueueManager('Chat1', new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('ChatServer', null)], ['GatewayServer', 'Gateway*']));
	queueManager.addChannel('Area.Chat.SendMessageToRoom', Function.mkdel(this, function(sender, data) {
		this.$client.rpush('ChatServer.ChatRoom.' + data.channel, data.user.userName + ': ' + data.content);
		var $t1 = this.$registeredChannels['ChatServer.ChatRoom.' + data.channel];
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var item = $t1[$t2];
			queueManager.sendMessage($ChatServer_ChatMessageRoomModel).call(queueManager, item, item.gateway, 'Area.Chat.MessageReceived', data);
		}
	}));
	queueManager.addChannel('Area.Chat.JoinRoom', Function.mkdel(this, function(sender1, data1) {
		if (Object.keyExists(this.$registeredChannels, data1.channel)) {
			this.$registeredChannels[data1.channel].add(sender1);
		}
	}));
	queueManager.addChannel('Area.Chat.CreateRoom', Function.mkdel(this, function(sender2, data2) {
		queueManager.qw.add(new CommonShuffleLibrary.QueueWatcher('ChatServer.Room.' + data2.channel, null));
		this.$registerChannel(data2.channel).add(sender2);
	}));
	var redis = require('redis');
	this.$client = redis.createClient(6379, CommonShuffleLibrary.IPs.get_redisIP());
};
$ChatServer_ChatServer.prototype = {
	cycle: function(channel) {
		this.$client.blpop([channel, 0], Function.mkdel(this, function(caller, dtj) {
			this.cycle(channel);
		}));
	},
	$registerChannel: function(channel) {
		var chan = this.$registeredChannels['ChatServer.ChatRoom.' + channel] = [];
		this.cycle(channel);
		return chan;
	}
};
$ChatServer_ChatServer.main = function() {
	new $ChatServer_ChatServer();
};
////////////////////////////////////////////////////////////////////////////////
// ChatServer.SendMessageToRoomModel
var $ChatServer_SendMessageToRoomModel = function() {
};
$ChatServer_SendMessageToRoomModel.createInstance = function() {
	return $ChatServer_SendMessageToRoomModel.$ctor();
};
$ChatServer_SendMessageToRoomModel.$ctor = function() {
	var $this = {};
	return $this;
};
Type.registerClass(global, 'ChatServer.ChatCreateRoomModel', $ChatServer_ChatCreateRoomModel, Object);
Type.registerClass(global, 'ChatServer.ChatJoinRoomModel', $ChatServer_ChatJoinRoomModel, Object);
Type.registerClass(global, 'ChatServer.ChatMessageRoomModel', $ChatServer_ChatMessageRoomModel, Object);
Type.registerClass(global, 'ChatServer.ChatServer', $ChatServer_ChatServer, Object);
Type.registerClass(global, 'ChatServer.SendMessageToRoomModel', $ChatServer_SendMessageToRoomModel, Object);
$ChatServer_ChatServer.main();
