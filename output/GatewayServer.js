require('./mscorlib.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// GatewayServer.GatewayServer
	var $GatewayServer_GatewayServer = function() {
		this.$ps = null;
		this.users = {};
		this.$myGatewayName = null;
		//ExtensionMethods.debugger("");
		var http = require('http');
		var app = http.createServer(function(req, res) {
			res.end();
		});
		var io = require('socket.io').listen(app);
		var fs = require('fs');
		var queueManager;
		var port = 1800 + (ss.Int32.trunc(Math.random() * 4000) | 0);
		app.listen(port);
		io.set('log level', 0);
		this.$myGatewayName = 'Gateway ' + CommonLibraries.Guid.newGuid();
		this.$ps = new CommonShuffleLibrary.PubSub(Function.mkdel(this, function() {
			this.$ps.subscribe('PUBSUB.GatewayServers.Ping', Function.mkdel(this, function(message) {
				this.$ps.publish('PUBSUB.GatewayServers', String.format('http://{0}:{1}', CommonShuffleLibrary.IPs.get_gatewayIP(), port));
			}));
			this.$ps.publish('PUBSUB.GatewayServers', String.format('http://{0}:{1}', CommonShuffleLibrary.IPs.get_gatewayIP(), port));
		}));
		queueManager = new CommonShuffleLibrary.QueueManager(this.$myGatewayName, new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('GatewayServer', Function.mkdel(this, this.$messageReceived)), new CommonShuffleLibrary.QueueWatcher(this.$myGatewayName, Function.mkdel(this, this.$messageReceived))], ['SiteServer', 'GameServer*', 'DebugServer', 'ChatServer', 'HeadServer']));
		io.sockets.on('connection', Function.mkdel(this, function(socket) {
			var user = null;
			socket.on('Gateway.Message', function(data) {
				if (ss.isNullOrUndefined(user)) {
					return;
				}
				var channel = 'Bad';
				switch (data.channel.split(String.fromCharCode(46))[1]) {
					case 'Game': {
						channel = 'GameServer';
						break;
					}
					case 'Site': {
						channel = 'SiteServer';
						break;
					}
					case 'Debug': {
						channel = ss.coalesce(user.currentGameServer, 'GameServer');
						break;
					}
					case 'Debug2': {
						channel = 'DebugServer';
						break;
					}
					case 'Chat': {
						channel = ss.coalesce(user.currentChatServer, 'ChatServer');
						break;
					}
				}
				queueManager.sendMessage(Models.UserSocketModel.toUserModel(user), channel, data.channel, data.content);
			});
			socket.on('Gateway.Login', Function.mkdel(this, function(data1) {
				user = Models.UserSocketModel.$ctor();
				user.password = data1.password;
				user.socket = socket;
				user.userName = data1.userName;
				user.hash = data1.userName;
				user.gateway = this.$myGatewayName;
				this.users[data1.userName] = user;
				this.$sendMessage(user, 'Area.Main.Login.Response', { successful: true, user: Models.UserSocketModel.toUserModel(user) });
			}));
			socket.on('disconnect', Function.mkdel(this, function(data2) {
				if (ss.isNullOrUndefined(user)) {
					return;
				}
				queueManager.sendMessage(Models.UserSocketModel.toUserModel(user), 'SiteServer', 'Area.Site.UserDisconnect', { user: Models.UserSocketModel.toUserModel(user) });
				queueManager.sendMessage(Models.UserSocketModel.toUserModel(user), 'ChatServer', 'Area.Chat.UserDisconnect', { user: Models.UserSocketModel.toUserModel(user) });
				queueManager.sendMessage(Models.UserSocketModel.toUserModel(user), 'GameServer', 'Area.Game.UserDisconnect', { user: Models.UserSocketModel.toUserModel(user) });
				delete this.users[user.userName];
			}));
		}));
	};
	$GatewayServer_GatewayServer.prototype = {
		$messageReceived: function(gateway, user, eventChannel, content) {
			if (Object.keyExists(this.users, user.userName)) {
				var u = this.users[user.userName];
				this.$sendMessage(u, eventChannel, content);
			}
		},
		$sendMessage: function(user, eventChannel, content) {
			this.$specialHandle(user, eventChannel, content);
			user.socket.emit('Client.Message', new Models.SocketClientMessageModel(Models.UserSocketModel.toUserModel(user), eventChannel, content));
		},
		$specialHandle: function(user, eventChannel, content) {
			if (eventChannel === 'Area.Game.RoomInfo') {
				user.currentGameServer = content.gameServer;
				content.gameServer = null;
			}
			if (eventChannel === 'Area.Chat.IDKJOINCHAT') {
				// user.CurrentGameServer = ((CHATROOMMODELIDKLOL)content).GameServer;
				// ((GameRoomModel)content).GameServer = null;
			}
		}
	};
	$GatewayServer_GatewayServer.main = function() {
		try {
			new $GatewayServer_GatewayServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			console.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc));
		}
	};
	Type.registerClass(global, 'GatewayServer.GatewayServer', $GatewayServer_GatewayServer, Object);
	$GatewayServer_GatewayServer.main();
})();
