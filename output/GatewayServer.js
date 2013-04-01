require('./mscorlib.js');EventEmitter= require('events.js').EventEmitter;require('./NodeLibraries.js');require('./CommonServerLibraries.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./Models.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// GatewayServer.GatewayServer
	var $GatewayServer_GatewayServer = function() {
		this.$myGatewayName = null;
		this.$ps = null;
		this.users = {};
		this.$curc = 0;
		this.$myGatewayName = 'Gateway ' + CommonLibraries.Guid.newGuid();
		// var charm = Charmer.Setup();
		// 
		// var prog = new ProgressBar(charm, 0, 100) {X = 5, Y = 5, Width = 10, CurValue = 12};
		// 
		// Global.SetInterval(() => {
		// prog.CurValue++;
		// },200);
		CommonServerLibraries.Logger.start(this.$myGatewayName);
		//ExtensionMethods.debugger("");
		var http = require('http');
		var app = http.createServer(function(req, res) {
			res.end();
		});
		var io = require('socket.io').listen(app);
		var fs = require('fs');
		var queueManager;
		var port = 1800 + (ss.Int32.trunc(Math.random() * 4000) | 0);
		var currentIP = CommonServerLibraries.ServerHelper.getNetworkIPs()[0];
		console.log(currentIP);
		app.listen(port);
		io.set('log level', 0);
		this.$ps = new CommonShuffleLibrary.PubSub(ss.mkdel(this, function() {
			this.$ps.subscribe(String).call(this.$ps, 'PUBSUB.GatewayServers.Ping', ss.mkdel(this, function(message) {
				this.$ps.publish('PUBSUB.GatewayServers', ss.formatString('http://{0}:{1}', currentIP, port));
			}));
			this.$ps.publish('PUBSUB.GatewayServers', ss.formatString('http://{0}:{1}', currentIP, port));
		}));
		queueManager = new CommonShuffleLibrary.QueueManager(this.$myGatewayName, new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('GatewayServer', ss.mkdel(this, this.$messageReceived)), new CommonShuffleLibrary.QueueWatcher(this.$myGatewayName, ss.mkdel(this, this.$messageReceived))], ['SiteServer', 'GameServer*', 'GameServer', 'DebugServer', 'ChatServer', 'ChatServer*', 'HeadServer']));
		io.sockets.on('connection', ss.mkdel(this, function(socket) {
			var j = ++this.$curc;
			console.log('Socket Connected ' + j);
			var user = null;
			socket.on('Gateway.Message', function(data) {
				if (ss.isNullOrUndefined(user)) {
					return;
				}
				console.log('Socket message ' + j + '  ' + user.userName);
				var channel = 'Bad';
				switch (data.channel.split(String.fromCharCode(46))[1]) {
					case 'Game': {
						channel = ss.coalesce(user.currentGameServer, 'GameServer');
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
				queueManager.sendMessage(channel, data.channel, Models.UserSocketModel.toLogicModel(user), data.content);
			});
			socket.on('Gateway.Login', ss.mkdel(this, function(data1) {
				debugger;
				user = Models.UserSocketModel.$ctor();
				user.password = data1.password;
				user.socket = socket;
				user.userName = data1.userName;
				user.hash = data1.userName;
				user.gateway = this.$myGatewayName;
				console.log('Socket login ' + j + '  ' + data1.userName);
				this.users[data1.userName] = user;
				queueManager.sendMessage('SiteServer', 'Area.Site.Login', Models.UserSocketModel.toLogicModel(user), { hash: user.hash });
			}));
			socket.on('disconnect', ss.mkdel(this, function(data2) {
				if (ss.isNullOrUndefined(user)) {
					return;
				}
				console.log('Socket left ' + j + '  ' + user.userName);
				queueManager.sendMessage('SiteServer', 'Area.Site.UserDisconnect', Models.UserSocketModel.toLogicModel(user), { user: Models.UserSocketModel.toLogicModel(user) });
				//disconnecting from the room in site server disconencts from chat..
				// if (user.CurrentChatServer != null)
				//     queueManager.SendMessage(user.ToLogicModel(), user.CurrentChatServer, "Area.Chat.UserDisconnect", new UserDisconnectModel(user.ToLogicModel()));
				if (ss.isValue(user.currentGameServer)) {
					queueManager.sendMessage(user.currentGameServer, 'Area.Game.UserDisconnect', Models.UserSocketModel.toLogicModel(user), { user: Models.UserSocketModel.toLogicModel(user) });
				}
				delete this.users[user.userName];
				socket.removeAllListeners();
				//socket.Delete();
				delete io.sockets.sockets[socket.id];
				this.$curc--;
			}));
		}));
	};
	$GatewayServer_GatewayServer.prototype = {
		$messageReceived: function(gateway, user, eventChannel, content) {
			if (ss.keyExists(this.users, user.userName)) {
				var u = this.users[user.userName];
				this.$sendMessage(u, eventChannel, content);
			}
		},
		$sendMessage: function(user, eventChannel, content) {
			if (this.$specialHandle(user, eventChannel, content)) {
				user.socket.emit('Client.Message', new Models.SocketClientMessageModel(Models.UserSocketModel.toUserModel(user), eventChannel, content));
			}
		},
		$specialHandle: function(user, eventChannel, content) {
			if (eventChannel === 'Area.Chat.RegisterServer') {
				CommonServerLibraries.Logger.log(ss.formatString('Chat Server {0} Registered to {1}', content.server, user.hash), 2);
				user.currentChatServer = content.server;
				return false;
			}
			if (eventChannel === 'Area.Chat.UnregisterServer') {
				CommonServerLibraries.Logger.log('Chat Server UnRegistered', 2);
				user.currentChatServer = null;
				return false;
			}
			if (eventChannel === 'Area.Game.RegisterServer') {
				CommonServerLibraries.Logger.log(ss.formatString('Game Server {0} Registered to {1}', content.server, user.hash), 2);
				user.currentGameServer = content.server;
				return false;
			}
			if (eventChannel === 'Area.Game.UnregisterServer') {
				CommonServerLibraries.Logger.log('Game Server UnRegistered', 2);
				user.currentGameServer = null;
				return false;
			}
			return true;
		}
	};
	$GatewayServer_GatewayServer.main = function() {
		try {
			new $GatewayServer_GatewayServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			CommonServerLibraries.Logger.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc), 0);
		}
	};
	ss.registerClass(global, 'GatewayServer.GatewayServer', $GatewayServer_GatewayServer);
	$GatewayServer_GatewayServer.main();
})();
