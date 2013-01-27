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
	//queueManager.AddChannel<ChatMessageRoomModel>("Area.Chat.SendMessageToRoom",
	//(sender, data) => {
	//client.RPush("ChatServer.ChatRoom." + data.Channel, data.User.UserName + ": " + data.Content);
	//foreach (var item in registeredChannels["ChatServer.ChatRoom." + data.Channel]) {
	//queueManager.SendMessage(item, item.Gateway, "Area.Chat.MessageReceived", data);
	//}
	//});
	//
	//queueManager.AddChannel<ChatJoinRoomModel>("Area.Chat.JoinRoom",
	//(sender, data) => {
	//if (registeredChannels.ContainsKey(data.Channel))
	//registeredChannels[data.Channel].Add(sender);
	//});
	//
	//queueManager.AddChannel<ChatCreateRoomModel>("Area.Chat.CreateRoom",
	//(sender, data) => {
	//queueManager.qw.Add(new QueueWatcher("ChatServer.Room." + data.Channel, null));
	//registerChannel(data.Channel).Add(sender);
	//});
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
	try {
		new $ChatServer_ChatServer();
	}
	catch ($t1) {
		var exc = ss.Exception.wrap($t1);
		console.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc));
	}
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
