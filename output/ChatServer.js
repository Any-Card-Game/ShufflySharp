require('./mscorlib.debug.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
Type.registerNamespace('ChatServer');
////////////////////////////////////////////////////////////////////////////////
// ChatServer.ChatCreateRoomModel
ChatServer.ChatCreateRoomModel = function() {
};
ChatServer.ChatCreateRoomModel.$ctor = function(channel) {
	var $this = {};
	$this.channel = null;
	$this.channel = channel;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ChatServer.ChatJoinRoomModel
ChatServer.ChatJoinRoomModel = function() {
};
ChatServer.ChatJoinRoomModel.$ctor = function(channel) {
	var $this = {};
	$this.channel = null;
	$this.channel = channel;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ChatServer.ChatMessageRoomModel
ChatServer.ChatMessageRoomModel = function() {
};
ChatServer.ChatMessageRoomModel.$ctor = function(channel, user, content) {
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
ChatServer.ChatServer = function() {
	this.$registeredChannels = ({});
	this.$client = null;
	var queueManager = new CommonShuffleLibrary.QueueManager('Chat1', new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('ChatServer', null)], ['GatewayServer', 'Gateway*']));
	queueManager.addChannel('Area.Chat.SendMessageToRoom', Function.mkdel(this, function(sender, data) {
		this.$client.rpush('ChatServer.ChatRoom.' + data.channel, data.user.userName + ': ' + data.content);
		var $t1 = this.$registeredChannels['ChatServer.ChatRoom.' + data.channel].getEnumerator();
		try {
			while ($t1.moveNext()) {
				var item = $t1.get_current();
				queueManager.sendMessage(ChatServer.ChatMessageRoomModel).call(queueManager, item, item.gateway, 'Area.Chat.MessageReceived', data);
			}
		}
		finally {
			$t1.dispose();
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
ChatServer.ChatServer.prototype = {
	cycle: function(channel) {
		this.$client.blpop([channel, 0], Function.mkdel(this, function(caller, dtj) {
			this.cycle(channel);
		}));
	},
	$registerChannel: function(channel) {
		var chan = this.$registeredChannels['ChatServer.ChatRoom.' + channel] = new Array();
		this.cycle(channel);
		return chan;
	}
};
////////////////////////////////////////////////////////////////////////////////
// ChatServer.SendMessageToRoomModel
ChatServer.SendMessageToRoomModel = function() {
};
ChatServer.SendMessageToRoomModel.$ctor = function() {
	var $this = {};
	return $this;
};
ChatServer.ChatCreateRoomModel.registerClass('ChatServer.ChatCreateRoomModel', Object);
ChatServer.ChatJoinRoomModel.registerClass('ChatServer.ChatJoinRoomModel', Object);
ChatServer.ChatMessageRoomModel.registerClass('ChatServer.ChatMessageRoomModel', Object);
ChatServer.ChatServer.registerClass('ChatServer.ChatServer', Object);
ChatServer.SendMessageToRoomModel.registerClass('ChatServer.SendMessageToRoomModel', Object);
new ChatServer.ChatServer();
