require('./mscorlib.js');EventEmitter= require('events').EventEmitter;require('./NodeLibraries.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');require('./DataModels.js');require('./RawDeflate.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.ServerManager
	var $ServerManager_$ServerManager = function() {
	};
	$ServerManager_$ServerManager.$main = function() {
		try {
			switch (process.argv[2].toLowerCase()) {
				case 'a':
				case 'admin': {
					new $ServerManager_AdminServer_AdminServer();
					break;
				}
				case 'gw':
				case 'gateway': {
					new $ServerManager_GatewayServer_GatewayServer();
					break;
				}
				case 'g':
				case 'game': {
					new $ServerManager_GameServer_GameServer();
					break;
				}
				case 'd':
				case 'debug': {
					new $ServerManager_DebugServer_DebugServer();
					break;
				}
				case 'c':
				case 'chat': {
					new $ServerManager_ChatServer_ChatServer();
					break;
				}
				case 'h':
				case 'head': {
					new $ServerManager_HeadServer_HeadServer();
					break;
				}
				case 'm':
				case 'monitor': {
					new $ServerManager_MonitorServer_MonitorServer();
					break;
				}
				case 's':
				case 'site': {
					new $ServerManager_SiteServer_SiteServer();
					break;
				}
				default: {
					NodeLibraries.Common.Logging.Logger.log('Failed to load: ' + process.argv[2], 0);
					break;
				}
			}
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			NodeLibraries.Common.Logging.Logger.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc), 0);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.AdminServer.AdminServer
	var $ServerManager_AdminServer_AdminServer = function() {
		this.$__dirname = null;
		this.$chats = null;
		this.$debug = false;
		this.$debugs = null;
		this.$exec = null;
		this.$fs = require('fs');
		this.$games = null;
		this.$gateways = null;
		this.$head = null;
		this.$indexPageData = 0;
		this.$nodeInspector = null;
		this.$nonDebuggable = null;
		this.$numOfChatServers = 1;
		this.$numOfGameServers = 1;
		this.$numOfGateways = 1;
		this.$numOfSiteServers = 1;
		this.$sites = null;
		this.$util = null;
		var fs = require('fs');
		NodeLibraries.Common.Logging.Logger.start('Admin');
		NodeLibraries.Common.Logging.Logger.log('Shuffly Admin V0.49', 1);
		NodeLibraries.Common.Logging.Logger.log('Shuffly Admin V0.49', 2);
		var redis = require('redis');
		var client = redis.createClient(6379, CommonLibraries.IPs.redisIP);
		// client.On<string,object>("monitor",(time, args) => {
		// Logger.Log("Monitor: "+time+" "+Json.Stringify(args),LogLevel.DebugInformation);
		// });
		this.$util = require('util');
		this.$exec = require('child_process').exec;
		this.$__dirname = CommonLibraries.IPs.HARDLOCATION;
		this.$nonDebuggable = ['node-inspector', 'pkill'];
		require('http').createServer(ss.mkdel(this, this.$handler)).listen(8090);
		this.$debug = true;
		setInterval(function() {
			console.log('keep alive ' + (new Date()).toString().substr(17, 24));
		}, 10000);
		process.on('exit', ss.mkdel(this, function() {
			NodeLibraries.Common.Logging.Logger.log('Exiting ', 1);
			this.$onAsk('k', false);
			this.$runProcess('pkill', ['node'], 0, null);
		}));
		if (this.$debug) {
			this.$onAsk('d', true);
		}
		this.$onAsk('d', true);
		if (this.$debug) {
			this.$nodeInspector = this.$runProcess('node-inspector', [], 0, null);
			NodeLibraries.Common.Logging.Logger.log('node-inspector Started', 1);
		}
		this.$onAsk('s', false);
	};
	$ServerManager_AdminServer_AdminServer.prototype = {
		$handler: function(request, response) {
			this.$fs.readFile(this.$__dirname + '/blank.html', 'ascii', ss.mkdel(this, function(err, content) {
				var fieldSets = '';
				fieldSets += ss.formatString('<span>Main Site: {0}</span>', '<a href=\'#' + parseInt((Math.random() * 20000).toString()) + '\' onclick=\'goHere("http://198.211.107.101","MainSite");\'>Launch</a>');
				fieldSets += this.$buildFieldset(this.$sites, 'Site Servers');
				fieldSets += this.$buildFieldset(this.$gateways, 'Gateway Servers');
				fieldSets += this.$buildFieldset(this.$games, 'Game Servers');
				fieldSets += this.$buildFieldset(this.$debugs, 'Debug Servers');
				fieldSets += this.$buildFieldset(this.$chats, 'Chat Servers');
				var dict = {};
				dict['Content-Type'] = 'text/html';
				response.writeHead(200, dict);
				response.end(ss.replaceAllString(content, '{0}', fieldSets));
			}));
		},
		$buildFieldset: function(items, name) {
			var str = '<fieldset>';
			str += '<ul style=\'list-style-type:none;\'>';
			str += ss.formatString('<li >{0}</li>', name);
			str += ss.formatString('<li ></li>');
			for (var $t1 = 0; $t1 < items.length; $t1++) {
				var process = items[$t1];
				str += '<li>';
				str += ss.formatString('<span>{0} ({1}): {2}</span>', process.name, process.index + 1, (this.$debug ? ss.formatString('<a href=\'#' + parseInt((Math.random() * 20000).toString()) + '\' onclick=\'goHere("http://198.211.107.101:8080/debug?port={0}","' + name + '(' + (process.index + 1) + ')' + '");\'>Debug</a>', process.debugPort + '&foo=' + parseInt((Math.random() * 5000000).toString())) : 'Debug'));
				str += '</li>';
				//document.frames["test"].location.reload();
			}
			str += '</ul>';
			str += '</fieldset>';
			return str;
		},
		$loop: function() {
			this.$ask('?: ', '', ss.mkdel(this, function(a) {
				this.$onAsk(a, false);
			}));
		},
		$onAsk: function(data, ignore) {
			var rest = data.substr(0, 2);
			switch (data.charAt(0)) {
				case 'd': {
					this.$debug = !this.$debug;
					NodeLibraries.Common.Logging.Logger.log('Debug ' + (this.$debug ? 'Enabled' : 'Disabled'), 1);
					break;
				}
				case 's': {
					this.$sites = [];
					this.$games = [];
					this.$chats = [];
					this.$debugs = [];
					this.$gateways = [];
					this.$head = new $ServerManager_AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ServerManager.js', 'head'], 4000, null), 'Head Server', 0, 4000);
					NodeLibraries.Common.Logging.Logger.log('Head Server Started', 1);
					for (var j = 0; j < this.$numOfSiteServers; j++) {
						ss.add(this.$sites, new $ServerManager_AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ServerManager.js', 'site'], 4100 + j, null), 'Site Server', j, 4100 + j));
					}
					NodeLibraries.Common.Logging.Logger.log(this.$sites.length + ' Site Servers Started', 1);
					for (var j1 = 0; j1 < this.$numOfGateways; j1++) {
						ss.add(this.$gateways, new $ServerManager_AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ServerManager.js', 'gateway'], 4400 + j1, null), 'Gateway Server', j1, 4400 + j1));
					}
					NodeLibraries.Common.Logging.Logger.log(this.$gateways.length + ' Gateway Servers Started', 1);
					for (var j2 = 0; j2 < this.$numOfGameServers; j2++) {
						ss.add(this.$games, new $ServerManager_AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ServerManager.js', 'game'], 4200 + j2, null), 'Game Server', j2, 4200 + j2));
					}
					NodeLibraries.Common.Logging.Logger.log(this.$games.length + ' Game Servers Started', 1);
					for (var j3 = 0; j3 < this.$numOfChatServers; j3++) {
						ss.add(this.$chats, new $ServerManager_AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ServerManager.js', 'chat'], 4500 + j3, null), 'Chat Server', j3, 4500 + j3));
					}
					NodeLibraries.Common.Logging.Logger.log(this.$chats.length + ' Chat Servers Started', 1);
					ss.add(this.$debugs, new $ServerManager_AdminServer_ProcessInformation(this.$runProcess('node', [this.$__dirname + 'ServerManager.js', 'debug'], 4300, null), 'Debug Server', 0, 4300));
					NodeLibraries.Common.Logging.Logger.log(this.$debugs.length + ' Debug Servers Started', 1);
					break;
				}
				case 'q': {
					process.exit();
					break;
				}
			}
			if (!ignore) {
				this.$loop();
			}
		},
		$ask: function(question, format, callback) {
			var stdin = process.stdin;
			var stdout = process.stdout;
			stdin.resume();
			stdout.write(question);
			stdin.once('data', function(data) {
				data = data.toString().trim();
				callback(data);
			});
		},
		$runProcess: function(process, args, debugPort, appArgs) {
			var al;
			var name = '';
			if (args.length > 0) {
				name = (al = args[0].split('/'))[al.length - 1].split('.')[0];
			}
			if (ss.indexOf(this.$nonDebuggable, process) === -1 && this.$debug) {
				var jf = ' --debug=';
				if (name.indexOf('Gatewa-') > -1) {
					jf = ' --debug-brk=';
				}
				args[0] = jf + debugPort + ' ' + args[0];
			}
			var dummy = this.$exec(process + ' ' + args.join(' ') + ' ' + ss.coalesce(appArgs, ''));
			if (ss.indexOf(this.$nonDebuggable, process) === -1) {
				dummy.stdout.on('data', ss.mkdel(this, function(data) {
					if (data.indexOf('debug: ') === -1) {
						this.$util.print(ss.formatString('--{0}: {1}   {2}   {3}', name, debugPort, (new Date()).toString().substr(17, 24), data));
						this.$util.print('?: ');
					}
				}));
				dummy.stderr.on('data', ss.mkdel(this, function(data1) {
					this.$util.print(ss.formatString('--{0}: {1}   {2}   {3}', name, debugPort, (new Date()).toString().substr(17, 24), data1));
					this.$util.print('?: ');
				}));
			}
			return dummy;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.AdminServer.ProcessInformation
	var $ServerManager_AdminServer_ProcessInformation = function(process, name, index, debugPort) {
		this.process = null;
		this.name = null;
		this.index = 0;
		this.debugPort = 0;
		this.process = process;
		this.name = name;
		this.index = index;
		this.debugPort = debugPort;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.ChatServer.ChatClientManager
	var $ServerManager_ChatServer_ChatClientManager = function(chatServerIndex) {
		this.$qManager = null;
		this.$1$ChatServerIndexField = null;
		this.$1$OnCreateChatChannelField = null;
		this.$1$OnSendMessageField = null;
		this.$1$OnJoinChatChannelField = null;
		this.$1$OnUserDisconnectField = null;
		this.$1$OnLeaveChatRoomField = null;
		this.set_chatServerIndex(chatServerIndex);
		this.$setup();
	};
	$ServerManager_ChatServer_ChatClientManager.prototype = {
		get_chatServerIndex: function() {
			return this.$1$ChatServerIndexField;
		},
		set_chatServerIndex: function(value) {
			this.$1$ChatServerIndexField = value;
		},
		add_onCreateChatChannel: function(value) {
			this.$1$OnCreateChatChannelField = ss.delegateCombine(this.$1$OnCreateChatChannelField, value);
		},
		remove_onCreateChatChannel: function(value) {
			this.$1$OnCreateChatChannelField = ss.delegateRemove(this.$1$OnCreateChatChannelField, value);
		},
		add_onSendMessage: function(value) {
			this.$1$OnSendMessageField = ss.delegateCombine(this.$1$OnSendMessageField, value);
		},
		remove_onSendMessage: function(value) {
			this.$1$OnSendMessageField = ss.delegateRemove(this.$1$OnSendMessageField, value);
		},
		add_onJoinChatChannel: function(value) {
			this.$1$OnJoinChatChannelField = ss.delegateCombine(this.$1$OnJoinChatChannelField, value);
		},
		remove_onJoinChatChannel: function(value) {
			this.$1$OnJoinChatChannelField = ss.delegateRemove(this.$1$OnJoinChatChannelField, value);
		},
		add_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateCombine(this.$1$OnUserDisconnectField, value);
		},
		remove_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateRemove(this.$1$OnUserDisconnectField, value);
		},
		add_onLeaveChatRoom: function(value) {
			this.$1$OnLeaveChatRoomField = ss.delegateCombine(this.$1$OnLeaveChatRoomField, value);
		},
		remove_onLeaveChatRoom: function(value) {
			this.$1$OnLeaveChatRoomField = ss.delegateRemove(this.$1$OnLeaveChatRoomField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_chatServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('ChatServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_chatServerIndex(), null)], ['ChatServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Chat.CreateChatRoom', ss.mkdel(this, function(user, data) {
				this.$1$OnCreateChatChannelField(user, data);
			}));
			this.$qManager.addChannel('Area.Chat.JoinChatRoom', ss.mkdel(this, function(user1, data1) {
				this.$1$OnJoinChatChannelField(user1, data1);
			}));
			this.$qManager.addChannel('Area.Chat.SendMessage', ss.mkdel(this, function(user2, data2) {
				this.$1$OnSendMessageField(user2, data2);
			}));
			this.$qManager.addChannel('Area.Chat.UserDisconnect', ss.mkdel(this, function(user3, data3) {
				this.$1$OnUserDisconnectField(user3, data3);
			}));
			this.$qManager.addChannel('Area.Chat.LeaveChatRoom', ss.mkdel(this, function(user4, data4) {
				this.$1$OnLeaveChatRoomField(user4);
			}));
		},
		sendChatLines: function(user, response) {
			this.$qManager.sendMessage(user.gateway, 'Area.Chat.ChatLines.Response', user, response);
		},
		sendChatInfo: function(user, response) {
			this.$qManager.sendMessage(user.gateway, 'Area.Chat.ChatInfo.Response', user, { info: response });
		},
		registerChatServer: function(user) {
			this.$qManager.sendMessage(user.gateway, 'Area.Chat.RegisterServer', user, { server: this.get_chatServerIndex() });
		},
		unregisterChatServer: function(user) {
			this.$qManager.sendMessage(user.gateway, 'Area.Chat.UnregisterServer', user, { server: this.get_chatServerIndex() });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.ChatServer.ChatManager
	var $ServerManager_ChatServer_ChatManager = function(chatServerIndex) {
		this.$myDataManager = null;
		this.$myServerManager = null;
		this.$runningRooms = [];
		this.$myDataManager = new CommonShuffleLibrary.DataManager();
		this.$myServerManager = new $ServerManager_ChatServer_ChatClientManager(chatServerIndex);
		this.$myServerManager.add_onCreateChatChannel(ss.mkdel(this, this.$onCreateChatChannel));
		this.$myServerManager.add_onJoinChatChannel(ss.mkdel(this, this.$onJoinChatChannel));
		this.$myServerManager.add_onSendMessage(ss.mkdel(this, this.$onSendMessage));
		this.$myServerManager.add_onLeaveChatRoom(ss.mkdel(this, this.$onLeaveChatRoom));
		this.$myServerManager.add_onUserDisconnect(ss.mkdel(this, this.$onUserDisconnect));
	};
	$ServerManager_ChatServer_ChatManager.prototype = {
		$onLeaveChatRoom: function(user) {
			this.$leaveChatRoom(user);
		},
		$leaveChatRoom: function(user) {
			//ExtensionMethods.debugger();
			var room = this.$getRoomFromUser(user);
			if (ss.isNullOrUndefined(room)) {
				throw new ss.Exception('idk');
			}
			for (var $t1 = 0; $t1 < room.users.length; $t1++) {
				var userLogicModel = room.users[$t1];
				if (ss.referenceEquals(userLogicModel.hash, user.hash)) {
					ss.remove(room.users, userLogicModel);
					break;
				}
			}
			this.$myDataManager.chatData.removeUser(room, user, ss.mkdel(this, function(a) {
				this.$myServerManager.unregisterChatServer(user);
				var roomToSend = { roomName: room.roomName, users: room.users, messages: null };
				for (var $t2 = 0; $t2 < room.users.length; $t2++) {
					var userLogicModel1 = room.users[$t2];
					this.$myServerManager.sendChatInfo(userLogicModel1, DataModels.ChatManagerModels.ChatRoomDataModel.toModel(roomToSend));
				}
			}));
		},
		$onSendMessage: function(user, data) {
			var room = this.$getRoomFromUser(user);
			if (ss.isNullOrUndefined(room)) {
				throw new ss.Exception('idk');
			}
			this.$myDataManager.chatData.addChatLine(user, room, data.message, ss.mkdel(this, function(a) {
				for (var $t1 = 0; $t1 < room.users.length; $t1++) {
					var userLogicModel = room.users[$t1];
					var $t3 = this.$myServerManager;
					var $t2 = [];
					ss.add($t2, a);
					$t3.sendChatLines(userLogicModel, { messages: $t2 });
				}
			}));
		},
		$getRoomFromUser: function(user) {
			var currentRoomData = null;
			for (var $t1 = 0; $t1 < this.$runningRooms.length; $t1++) {
				var chatRoomModel = this.$runningRooms[$t1];
				for (var $t2 = 0; $t2 < chatRoomModel.users.length; $t2++) {
					var item = chatRoomModel.users[$t2];
					if (ss.referenceEquals(item.userName, user.userName)) {
						currentRoomData = chatRoomModel;
					}
				}
			}
			return currentRoomData;
		},
		$onJoinChatChannel: function(user, data) {
			var cur = this.$getRoomFromUser(user);
			if (ss.isValue(cur)) {
				this.$leaveChatRoom(user);
			}
			var currentRoomData = null;
			for (var $t1 = 0; $t1 < this.$runningRooms.length; $t1++) {
				var chatRoomModel = this.$runningRooms[$t1];
				if (ss.referenceEquals(chatRoomModel.roomName, data.room.chatChannel)) {
					currentRoomData = chatRoomModel;
				}
			}
			if (ss.isNullOrUndefined(currentRoomData)) {
				throw new ss.Exception('idk');
			}
			this.$myDataManager.chatData.addUser(currentRoomData, user, ss.mkdel(this, function(room) {
				this.$myServerManager.registerChatServer(user);
				var roomToSend = { roomName: room.roomName, users: room.users, messages: room.messages };
				roomToSend.messages = ss.arrayExtract(room.messages, room.messages.length - 5);
				this.$myServerManager.sendChatInfo(user, DataModels.ChatManagerModels.ChatRoomDataModel.toModel(roomToSend));
				roomToSend = { roomName: room.roomName, users: room.users, messages: null };
				for (var $t2 = 0; $t2 < currentRoomData.users.length; $t2++) {
					var userLogicModel = currentRoomData.users[$t2];
					this.$myServerManager.sendChatInfo(userLogicModel, DataModels.ChatManagerModels.ChatRoomDataModel.toModel(roomToSend));
				}
			}));
		},
		$onCreateChatChannel: function(user, data) {
			var cur = this.$getRoomFromUser(user);
			if (ss.isValue(cur)) {
				this.$leaveChatRoom(user);
			}
			this.$myDataManager.siteData.room_SetChatServer(data.room, this.$myServerManager.get_chatServerIndex(), ss.mkdel(this, function(r) {
				this.$myDataManager.chatData.createChatChannel(data.room.chatChannel, user, ss.mkdel(this, function(a) {
					this.$myServerManager.registerChatServer(user);
					ss.add(this.$runningRooms, a);
					this.$myServerManager.sendChatInfo(user, DataModels.ChatManagerModels.ChatRoomDataModel.toModel(a));
				}));
			}));
		},
		$onUserDisconnect: function(user, data) {
			NodeLibraries.Common.Logging.Logger.log('Awww, dat ' + user.userName + ' disconnected', 1);
			this.$myServerManager.unregisterChatServer(user);
			this.$leaveChatRoom(user);
			//removeUserFromRoom(data.User, (room) => { });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.ChatServer.ChatServer
	var $ServerManager_ChatServer_ChatServer = function() {
		this.$chatServerIndex = null;
		this.$chatServerIndex = 'ChatServer' + CommonLibraries.Guid.newGuid();
		NodeLibraries.Common.Logging.Logger.start(this.$chatServerIndex);
		new global.ArrayUtils();
		process.on('exit', function() {
			NodeLibraries.Common.Logging.Logger.log('exi ChatServer', 2);
		});
		var chatManager = new $ServerManager_ChatServer_ChatManager(this.$chatServerIndex);
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.DebugServer.DebugServer
	var $ServerManager_DebugServer_DebugServer = function() {
		NodeLibraries.Common.Logging.Logger.start('Debug1');
		var fs = require('fs');
		var queueManager = new CommonShuffleLibrary.QueueManager('Debug1', new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('DebugServer', null)], ['GatewayServer', 'Gateway*']));
		queueManager.addChannel('Area.Debug2.GetGameSource.Request', function(sender, data) {
			var sourceRequest = data;
			fs.readFile('/usr/local/src/new/Games/' + sourceRequest.gameName + '/app.js', 'ascii', function(err, data2) {
				queueManager.sendMessage(sender.gateway, 'Area.Debug.GetGameSource.Response', sender, { content: data2 });
			});
		});
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GameServer.GameClientManager
	var $ServerManager_GameServer_GameClientManager = function(gameServerIndex) {
		this.$qManager = null;
		this.$1$GameServerIndexField = null;
		this.$1$OnGameCreateField = null;
		this.$1$OnUserAnswerQuestionField = null;
		this.$1$OnUserDisconnectField = null;
		this.$1$OnUserLeaveField = null;
		this.set_gameServerIndex(gameServerIndex);
		this.$setup();
	};
	$ServerManager_GameServer_GameClientManager.prototype = {
		get_gameServerIndex: function() {
			return this.$1$GameServerIndexField;
		},
		set_gameServerIndex: function(value) {
			this.$1$GameServerIndexField = value;
		},
		add_onGameCreate: function(value) {
			this.$1$OnGameCreateField = ss.delegateCombine(this.$1$OnGameCreateField, value);
		},
		remove_onGameCreate: function(value) {
			this.$1$OnGameCreateField = ss.delegateRemove(this.$1$OnGameCreateField, value);
		},
		add_onUserAnswerQuestion: function(value) {
			this.$1$OnUserAnswerQuestionField = ss.delegateCombine(this.$1$OnUserAnswerQuestionField, value);
		},
		remove_onUserAnswerQuestion: function(value) {
			this.$1$OnUserAnswerQuestionField = ss.delegateRemove(this.$1$OnUserAnswerQuestionField, value);
		},
		add_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateCombine(this.$1$OnUserDisconnectField, value);
		},
		remove_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateRemove(this.$1$OnUserDisconnectField, value);
		},
		add_onUserLeave: function(value) {
			this.$1$OnUserLeaveField = ss.delegateCombine(this.$1$OnUserLeaveField, value);
		},
		remove_onUserLeave: function(value) {
			this.$1$OnUserLeaveField = ss.delegateRemove(this.$1$OnUserLeaveField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_gameServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('GameServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_gameServerIndex(), null)], ['GameServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Game.Create', ss.mkdel(this, function(user, data) {
				this.$1$OnGameCreateField(data);
			}));
			this.$qManager.addChannel('Area.Game.AnswerQuestion', ss.mkdel(this, function(user1, data1) {
				this.$1$OnUserAnswerQuestionField(user1, data1);
			}));
			this.$qManager.addChannel('Area.Game.UserDisconnect', ss.mkdel(this, function(user2, data2) {
				this.$1$OnUserDisconnectField(user2, data2);
			}));
			this.$qManager.addChannel('Area.Game.LeaveGameRoom', ss.mkdel(this, function(user3, data3) {
				this.$1$OnUserLeaveField(user3, data3);
			}));
		},
		$sendMessageToAll: function(room, message, val) {
			for (var $t1 = 0; $t1 < room.players.length; $t1++) {
				var player = room.players[$t1];
				this.$qManager.sendMessage(player.gateway, message, player, val);
			}
		},
		sendGameStarted: function(room) {
			var $t1 = Models.GameManagerModels.GameRoomModel.$ctor();
			$t1.roomID = room.roomID;
			this.$sendMessageToAll(room, 'Area.Game.Started', $t1);
		},
		sendGameOver: function(room) {
			this.$sendMessageToAll(room, 'Area.Game.GameOver', 'a');
			if (ss.isValue(room.debuggingSender)) {
				this.$qManager.sendMessage(room.debuggingSender.gateway, 'Area.Debug.GameOver', room.debuggingSender, new Object());
			}
		},
		sendUpdateState: function(room) {
			this.$sendMessageToAll(room, 'Area.Game.UpdateState', (new Compressor()).CompressText(JSON.stringify(CommonLibraries.Help.cleanUp(global.CardGame).call(null, room.game.cardGame))));
		},
		sendDebugLog: function(room, ganswer) {
			this.$qManager.sendMessage(room.debuggingSender.gateway, 'Area.Debug.Log', room.debuggingSender, ganswer);
		},
		sendDebugBreak: function(room, ganswer) {
			this.$qManager.sendMessage(room.debuggingSender.gateway, 'Area.Debug.Break', room.debuggingSender, ganswer);
		},
		sendAskQuestion: function(user, gameAnswer) {
			this.$qManager.sendMessage(user.gateway, 'Area.Game.AskQuestion', user, CommonLibraries.Help.cleanUp(Models.GameManagerModels.GameSendAnswerModel).call(null, gameAnswer));
		},
		registerGameServer: function(user) {
			this.$qManager.sendMessage(user.gateway, 'Area.Game.RegisterServer', user, { server: this.get_gameServerIndex() });
		},
		unregisterGameServer: function(user) {
			this.$qManager.sendMessage(user.gateway, 'Area.Game.UnregisterServer', user, { server: this.get_gameServerIndex() });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GameServer.GameData
	var $ServerManager_GameServer_GameData = function() {
		this.finishedGames = 0;
		this.totalGames = 0;
		this.totalPlayers = 0;
		this.totalQuestionsAnswered = 0;
	};
	$ServerManager_GameServer_GameData.prototype = {
		toString: function() {
			return 'Total: ' + this.totalGames + '\n Running: ' + this.$runningGames() + '\n Total Players: ' + this.totalPlayers + '\n Answered: ' + this.totalQuestionsAnswered;
		},
		$runningGames: function() {
			return this.totalGames - this.finishedGames;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GameServer.GameManager
	var $ServerManager_GameServer_GameManager = function(gameServerIndex) {
		this.$QUEUEPERTICK = 1;
		this.$answerQueue = [];
		this.$cachedGames = null;
		this.$dataManager = null;
		this.$gameData = null;
		this.$myServerManager = null;
		this.$rooms = null;
		this.$skipped__ = 0;
		this.$startTime = new Date();
		this.$total__ = 0;
		this.$verbose = false;
		this.$myServerManager = new $ServerManager_GameServer_GameClientManager(gameServerIndex);
		this.$myServerManager.add_onGameCreate(ss.mkdel(this, this.createGame));
		this.$myServerManager.add_onUserAnswerQuestion(ss.mkdel(this, this.userAnswerQuestion));
		this.$myServerManager.add_onUserDisconnect(ss.mkdel(this, this.$userDisconnect));
		this.$myServerManager.add_onUserLeave(ss.mkdel(this, this.$userLeave));
		this.$rooms = [];
		this.$cachedGames = {};
		this.$gameData = new $ServerManager_GameServer_GameData();
		this.$dataManager = new CommonShuffleLibrary.DataManager();
		setInterval(ss.mkdel(this, this.$flushQueue), 50);
	};
	$ServerManager_GameServer_GameManager.prototype = {
		$userDisconnect: function(user, data) {
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				for (var $t2 = 0; $t2 < gameRoom.players.length; $t2++) {
					var player = gameRoom.players[$t2];
					if (ss.referenceEquals(player.userName, user.userName)) {
						console.log('22User Left: ' + player.userName);
						gameRoom.playerLeave(player);
						break;
					}
				}
			}
		},
		$userLeave: function(user, data) {
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				for (var $t2 = 0; $t2 < gameRoom.players.length; $t2++) {
					var player = gameRoom.players[$t2];
					if (ss.referenceEquals(player.userName, user.userName)) {
						console.log('11User Left: ' + player.userName);
						gameRoom.playerLeave(player);
						break;
					}
				}
			}
		},
		createGame: function(data) {
			NodeLibraries.Common.Logging.Logger.log('--game created ', 1);
			var room;
			ss.add(this.$rooms, room = $ServerManager_GameServer_Models_GameRoom.$ctor());
			room.maxUsers = data.players.length;
			//todo idk
			room.gameType = data.gameType;
			room.started = false;
			ss.arrayAddRange(room.players, data.players);
			var gameObject;
			if (ss.keyExists(this.$cachedGames, room.gameType)) {
				gameObject = this.$cachedGames[room.gameType];
			}
			else {
				gameObject = this.$cachedGames[room.gameType] = require(ss.formatString('./Games/{0}/app.js', room.gameType));
			}
			room.fiber = this.$createFiber(room, gameObject, true);
			room.unwind = ss.mkdel(this, function(players) {
				this.$gameData.finishedGames++;
				NodeLibraries.Common.Logging.Logger.log('--game closed', 1);
			});
			room.playerLeave = ss.delegateCombine(room.playerLeave, function(player) {
				//todo laeve player api in the game
				ss.remove(room.players, player);
				ss.add(room.playersLeft, player);
			});
			for (var $t1 = 0; $t1 < room.players.length; $t1++) {
				var userLogicModel = room.players[$t1];
				this.$myServerManager.registerGameServer(userLogicModel);
			}
			this.$startGame(room);
		},
		$startGame: function(room) {
			this.$myServerManager.sendGameStarted(room);
			room.started = true;
			var answer = room.fiber.run(room.players);
			this.$processGameResponse(room, answer);
		},
		userAnswerQuestion: function(user, data) {
			ss.add(this.$answerQueue, { item1: user, item2: data });
		},
		$flushQueue: function() {
			var ind = 0;
			for (ind = 0; this.$answerQueue.length > 0 && ind < this.$QUEUEPERTICK; ind++) {
				NodeLibraries.Common.Logging.Logger.log('-- w pop', 2);
				var arg2 = this.$answerQueue[0];
				ss.removeAt(this.$answerQueue, 0);
				var data = arg2;
				var room = this.$getRoomByPlayer(arg2.item1.userName);
				if (ss.isNullOrUndefined(room)) {
					NodeLibraries.Common.Logging.Logger.log('Room not found for user: ' + arg2.item1.userName, 0);
					continue;
					throw new ss.Exception('idk');
				}
				var dict = global.CardGameAnswer.$ctor();
				dict.value = data.item2.answer;
				ss.add(room.answers, dict);
				var answ = room.fiber.run(dict);
				//dataManager.GameData.Insert(new GameInfoModel() {GameName = room.Name, AnswerIndex = answ.Contents});
				this.$processGameResponse(room, answ);
			}
			if (ind === 0) {
				this.$skipped__++;
			}
			else {
				this.$total__ += ind;
				if ((this.$total__ + this.$skipped__) % 20 === 0) {
					var dt = new Date();
					NodeLibraries.Common.Logging.Logger.log(ss.formatString('{0} =  tot: __{1}__ + shift: {2} + T: {3} + QSize: {4} + T Rooms: {5} + Per SecondL {6}', this.$myServerManager.get_gameServerIndex().substr(0, 19), this.$total__ + this.$skipped__, ind, this.$total__, this.$answerQueue.length, this.$rooms.length, this.$gameData.totalQuestionsAnswered / ((dt.getTime() - this.$startTime.getTime()) / 1000)), 1);
				}
			}
		},
		$createFiber: function(room, gameObject, emulating) {
			return new Fiber(ss.mkdel(this, function(players) {
				if (ss.isNullOrUndefined(players) || players.length === 0) {
					return true;
				}
				room.players = players;
				NodeLibraries.Common.Logging.Logger.log('game started', 2);
				var sev = null;
				eval('sev = new gameObject();');
				room.playersLeft = [];
				sev.cardGame.emulating = emulating;
				room.game = sev;
				sev.cardGame.setAnswers(room.answers);
				sev.cardGame.setPlayers(players);
				this.$gameData.totalGames++;
				this.$gameData.totalPlayers += players.length;
				sev.cardGame.answerIndex = 0;
				sev.constructor();
				sev.runGame();
				NodeLibraries.Common.Logging.Logger.log('Doneski', 1);
				room.unwind(players);
				return true;
			}));
		},
		$processGameResponse: function(room, response) {
			if (ss.isNullOrUndefined(response)) {
				NodeLibraries.Common.Logging.Logger.log('game request over', 1);
				this.$myServerManager.sendGameOver(room);
				room.fiber.run();
				ss.remove(this.$rooms, room);
				room.unwind(room.players);
				return;
			}
			switch (response.type) {
				case 0: {
					this.$askPlayerQuestion(room, response);
					break;
				}
				case 5: {
					this.$didPlayersLeave(room, response);
					break;
				}
				case 2: {
					this.$gameOver(room);
					break;
				}
				case 1: {
					this.$logGameConsoleLine(room, response);
					break;
				}
				case 3: {
					this.$breakGameExecution(room, response);
					break;
				}
			}
		},
		$didPlayersLeave: function(room, response) {
			room.fiber.run(room.playersLeft);
			ss.clear(room.playersLeft);
		},
		$breakGameExecution: function(room, response) {
			if (!room.debuggable) {
				var answ3 = room.fiber.run();
				this.$processGameResponse(room, answ3);
				return;
			}
			if (!room.game.cardGame.emulating) {
				var ganswer = { lineNumber: response.lineNumber + 2, value: 0 };
				this.$myServerManager.sendDebugBreak(room, ganswer);
			}
		},
		$logGameConsoleLine: function(room, answer) {
			var answ2 = room.fiber.run();
			this.$processGameResponse(room, answ2);
			if (!room.game.cardGame.emulating && room.debuggable) {
				//Logger.Log(gameData.toString());
				var ganswer = { lineNumber: 0, value: answer.contents };
				this.$myServerManager.sendDebugLog(room, ganswer);
			}
		},
		$gameOver: function(room) {
			NodeLibraries.Common.Logging.Logger.log('game real over', 1);
			this.$myServerManager.sendUpdateState(room);
			this.$myServerManager.sendGameOver(room);
			room.fiber.reset();
			ss.remove(this.$rooms, room);
		},
		$askPlayerQuestion: function(room, answer) {
			this.$gameData.totalQuestionsAnswered++;
			var answ = answer.question;
			if (ss.isNullOrUndefined(answ)) {
				NodeLibraries.Common.Logging.Logger.log('game question over', 1);
				this.$myServerManager.sendGameOver(room);
				room.fiber.run();
				//     profiler.takeSnapshot('game over ' + room.roomID);
				return;
			}
			this.$askQuestion(answ, room);
			//Logger.Log(gameData.toString());
			var dt = new Date();
			var then = dt.getMilliseconds();
			//Logger.Log(then - now + " Milliseconds");
			//  Logger.Log(gameData.TotalQuestionsAnswered / ((dt.GetTime() - startTime.GetTime()) / 1000d) + " Answers per seconds", LogLevel.DebugInformation);
		},
		$askQuestion: function(answ, room) {
			var user = this.$getPlayerByUsername(room, answ.user.userName);
			this.$myServerManager.sendAskQuestion(user, { question: answ.question, answers: answ.answers });
			this.$myServerManager.sendUpdateState(room);
			if (this.$verbose) {
				NodeLibraries.Common.Logging.Logger.log(answ.user.userName + ': ' + answ.question + '   ', 2);
				var ind = 0;
				for (var $t1 = 0; $t1 < answ.answers.length; $t1++) {
					var answer = answ.answers[$t1];
					NodeLibraries.Common.Logging.Logger.log('     ' + ind++ + ': ' + answer, 2);
				}
			}
		},
		$getPlayerByUsername: function(room, userName) {
			for (var $t1 = 0; $t1 < room.players.length; $t1++) {
				var player = room.players[$t1];
				if (ss.referenceEquals(player.userName, userName)) {
					return player;
				}
			}
			return null;
		},
		$getRoomByPlayer: function(userName) {
			for (var $t1 = 0; $t1 < this.$rooms.length; $t1++) {
				var gameRoom = this.$rooms[$t1];
				for (var $t2 = 0; $t2 < gameRoom.players.length; $t2++) {
					var userLogicModel = gameRoom.players[$t2];
					if (ss.referenceEquals(userLogicModel.userName, userName)) {
						return gameRoom;
					}
				}
			}
			return null;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GameServer.GameServer
	var $ServerManager_GameServer_GameServer = function() {
		this.$childProcess = null;
		this.$gameServerIndex = null;
		this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
		NodeLibraries.Common.Logging.Logger.start(this.$gameServerIndex);
		this.$childProcess = require('child_process');
		global.Fiber = require('fibers');
		process.on('exit', function() {
			NodeLibraries.Common.Logging.Logger.log('exi', 2);
		});
		var gameManager = new $ServerManager_GameServer_GameManager(this.$gameServerIndex);
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GameServer.Models.FiberYieldResponse
	var $ServerManager_GameServer_Models_FiberYieldResponse = function() {
	};
	$ServerManager_GameServer_Models_FiberYieldResponse.createInstance = function() {
		return $ServerManager_GameServer_Models_FiberYieldResponse.$ctor();
	};
	$ServerManager_GameServer_Models_FiberYieldResponse.$ctor = function() {
		var $this = {};
		$this.contents = 0;
		$this.lineNumber = 0;
		$this.type = 0;
		$this.question = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GameServer.Models.GameQuestionAnswerModel
	var $ServerManager_GameServer_Models_GameQuestionAnswerModel = function() {
	};
	$ServerManager_GameServer_Models_GameQuestionAnswerModel.createInstance = function() {
		return $ServerManager_GameServer_Models_GameQuestionAnswerModel.$ctor();
	};
	$ServerManager_GameServer_Models_GameQuestionAnswerModel.$ctor = function() {
		var $this = {};
		$this.answers = null;
		$this.cardGame = null;
		$this.question = null;
		$this.user = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GameServer.Models.GameRoom
	var $ServerManager_GameServer_Models_GameRoom = function() {
	};
	$ServerManager_GameServer_Models_GameRoom.createInstance = function() {
		return $ServerManager_GameServer_Models_GameRoom.$ctor();
	};
	$ServerManager_GameServer_Models_GameRoom.$ctor = function() {
		var $this = {};
		$this.answers = null;
		$this.debuggable = false;
		$this.debuggingSender = null;
		$this.fiber = null;
		$this.game = null;
		$this.gameType = null;
		$this.maxUsers = 0;
		$this.players = null;
		$this.roomID = null;
		$this.started = false;
		$this.unwind = null;
		$this.playerLeave = null;
		$this.playersLeft = null;
		$this.players = [];
		$this.roomID = CommonLibraries.Guid.newGuid();
		$this.answers = [];
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.GatewayServer.GatewayServer
	var $ServerManager_GatewayServer_GatewayServer = function() {
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
		// prog.CurValue++;1
		// },200);
		NodeLibraries.Common.Logging.Logger.start(this.$myGatewayName);
		//ExtensionMethods.debugger("");
		var http = require('http');
		var app = http.createServer(function(req, res) {
			res.end();
		});
		var io = require('socket.io').listen(app);
		var fs = require('fs');
		var queueManager;
		var port = 1800 + (ss.Int32.trunc(Math.random() * 4000) | 0);
		port = 1800;
		var currentSubdomain = 'gateway1';
		var currentIP = NodeLibraries.Common.Logging.ServerHelper.getNetworkIPs()[0];
		console.log(currentIP);
		app.listen(port);
		io.set('log level', 0);
		this.$ps = new CommonShuffleLibrary.PubSub(ss.mkdel(this, function() {
			this.$ps.subscribe(String).call(this.$ps, 'PUBSUB.GatewayServers.Ping', ss.mkdel(this, function(message) {
				this.$ps.publish('PUBSUB.GatewayServers', ss.formatString('http://{0}.{1}', currentSubdomain, 'anycardgame.com'));
				//                          ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", currentIP, port));
			}));
			//                                ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", currentIP, port));
			this.$ps.publish('PUBSUB.GatewayServers', ss.formatString('http://{0}.{1}', currentSubdomain, 'anycardgame.com'));
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
				//ExtensionMethods.debugger();
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
	$ServerManager_GatewayServer_GatewayServer.prototype = {
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
				NodeLibraries.Common.Logging.Logger.log(ss.formatString('Chat Server {0} Registered to {1}', content.server, user.hash), 2);
				user.currentChatServer = content.server;
				return false;
			}
			if (eventChannel === 'Area.Chat.UnregisterServer') {
				NodeLibraries.Common.Logging.Logger.log('Chat Server UnRegistered', 2);
				user.currentChatServer = null;
				return false;
			}
			if (eventChannel === 'Area.Game.RegisterServer') {
				NodeLibraries.Common.Logging.Logger.log(ss.formatString('Game Server {0} Registered to {1}', content.server, user.hash), 2);
				user.currentGameServer = content.server;
				return false;
			}
			if (eventChannel === 'Area.Game.UnregisterServer') {
				NodeLibraries.Common.Logging.Logger.log('Game Server UnRegistered', 2);
				user.currentGameServer = null;
				return false;
			}
			return true;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.HeadServer.HeadServer
	var $ServerManager_HeadServer_HeadServer = function() {
		this.$__dirname = CommonLibraries.IPs.HARDLOCATION;
		this.$fs = require('fs');
		this.$gateways = [];
		this.$indexForSites = [];
		this.$indexPageData = null;
		this.$oldGateways = [];
		this.$oldIndex = [];
		this.$pubsub = null;
		this.$qManager = null;
		this.$siteIndex = 0;
		var name = 'Head1';
		NodeLibraries.Common.Logging.Logger.start(name);
		this.$qManager = new CommonShuffleLibrary.QueueManager(name, new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('HeadServer', null), new CommonShuffleLibrary.QueueWatcher(name, null)], ['GatewayServer']));
		this.$fs.readFile(this.$__dirname + '/index.html', 'ascii', ss.mkdel(this, this.ready));
		this.$pubsub = new CommonShuffleLibrary.PubSub(ss.mkdel(this, function() {
			this.$pubsub.subscribe(String).call(this.$pubsub, 'PUBSUB.GatewayServers', ss.mkdel(this, function(message) {
				ss.add(this.$indexForSites, ss.replaceAllString(this.$indexPageData, '{{gateway}}', message));
				ss.add(this.$gateways, message);
			}));
		}));
		require('http').createServer(ss.mkdel(this, this.$handlerWS)).listen(8844);
		setInterval(ss.mkdel(this, this.$pollGateways), 5000);
		this.$pollGateways();
	};
	$ServerManager_HeadServer_HeadServer.prototype = {
		$pollGateways: function() {
			this.$pubsub.publish('PUBSUB.GatewayServers.Ping', '');
			if (this.$indexForSites.length > 0) {
				this.$oldIndex = this.$indexForSites;
			}
			if (this.$gateways.length > 0) {
				this.$oldGateways = this.$gateways;
			}
			this.$indexForSites = [];
			this.$gateways = [];
			this.$siteIndex = 0;
		},
		$handlerWS: function(request, response) {
			if (this.$oldGateways.length > 0) {
				var inj = this.$siteIndex++ % this.$oldIndex.length;
				response.end(this.$oldGateways[inj]);
				return;
			}
			response.end();
		},
		$handler: function(request, response) {
			var dict = {};
			dict['Content-Type'] = 'text/html';
			if (this.$oldIndex.length > 0) {
				response.writeHead(200, dict);
				var inj = this.$siteIndex++ % this.$oldIndex.length;
				response.end(this.$oldIndex[inj]);
			}
			else {
				response.writeHead(200, dict);
				response.end();
			}
		},
		ready: function(error, content) {
			this.$indexPageData = content.toString();
			this.$indexPageData = content.toString();
			require('http').createServer(ss.mkdel(this, this.$handler)).listen(1700);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.MonitorServer.MonitorServer
	var $ServerManager_MonitorServer_MonitorServer = function() {
		this.$myGatewayName = null;
		this.$ps = null;
		this.users = {};
		this.$myGatewayName = 'Gateway ' + CommonLibraries.Guid.newGuid();
		NodeLibraries.Common.Logging.Logger.start(this.$myGatewayName);
		//ExtensionMethods.debugger("");
		var http = require('http');
		var app = http.createServer(function(req, res) {
			res.end();
		});
		var io = require('socket.io').listen(app);
		var fs = require('fs');
		var queueManager;
		var port = 1800 + (ss.Int32.trunc(Math.random() * 4000) | 0);
		var currentIP = NodeLibraries.Common.Logging.ServerHelper.getNetworkIPs()[0];
		console.log(currentIP);
		app.listen(port);
		io.set('log level', 0);
		this.$ps = new CommonShuffleLibrary.PubSub(ss.mkdel(this, function() {
			this.$ps.subscribe(String).call(this.$ps, 'PUBSUB.GatewayServers.Ping', ss.mkdel(this, function(message) {
				this.$ps.publish('PUBSUB.GatewayServers', ss.formatString('http://{0}:{1}', currentIP, port));
			}));
			this.$ps.publish('PUBSUB.GatewayServers', ss.formatString('http://{0}:{1}', currentIP, port));
		}));
		queueManager = new CommonShuffleLibrary.QueueManager(this.$myGatewayName, new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('MonitorServer', ss.mkdel(this, this.$messageReceived)), new CommonShuffleLibrary.QueueWatcher(this.$myGatewayName, ss.mkdel(this, this.$messageReceived))], ['SiteServer', 'GameServer*', 'GameServer', 'DebugServer', 'ChatServer', 'ChatServer*', 'HeadServer']));
		io.sockets.on('connection', ss.mkdel(this, function(socket) {
			var user = null;
			socket.on('Gateway.Message', function(data) {
				if (ss.isNullOrUndefined(user)) {
					return;
				}
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
			socket.on('disconnect', ss.mkdel(this, function(data1) {
				if (ss.isNullOrUndefined(user)) {
					return;
				}
				queueManager.sendMessage('SiteServer', 'Area.Site.UserDisconnect', Models.UserSocketModel.toLogicModel(user), { user: Models.UserSocketModel.toLogicModel(user) });
				//disconnecting from the room in site server disconencts from chat..
				// if (user.CurrentChatServer != null)
				//     queueManager.SendMessage(user.ToLogicModel(), user.CurrentChatServer, "Area.Chat.UserDisconnect", new UserDisconnectModel(user.ToLogicModel()));
				if (ss.isValue(user.currentGameServer)) {
					queueManager.sendMessage(user.currentGameServer, 'Area.Game.UserDisconnect', Models.UserSocketModel.toLogicModel(user), { user: Models.UserSocketModel.toLogicModel(user) });
				}
				delete this.users[user.userName];
			}));
		}));
	};
	$ServerManager_MonitorServer_MonitorServer.prototype = {
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
				NodeLibraries.Common.Logging.Logger.log(ss.formatString('Chat Server {0} Registered to {1}', content.server, user.hash), 2);
				user.currentChatServer = content.server;
				return false;
			}
			if (eventChannel === 'Area.Chat.UnregisterServer') {
				NodeLibraries.Common.Logging.Logger.log('Chat Server UnRegistered', 2);
				user.currentChatServer = null;
				return false;
			}
			if (eventChannel === 'Area.Game.RegisterServer') {
				NodeLibraries.Common.Logging.Logger.log(ss.formatString('Game Server {0} Registered to {1}', content.server, user.hash), 2);
				user.currentGameServer = content.server;
				return false;
			}
			if (eventChannel === 'Area.Game.UnregisterServer') {
				NodeLibraries.Common.Logging.Logger.log('Game Server UnRegistered', 2);
				user.currentGameServer = null;
				return false;
			}
			return true;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.SiteServer.SiteClientManager
	var $ServerManager_SiteServer_SiteClientManager = function(siteServerIndex) {
		this.$qManager = null;
		this.$1$SiteServerIndexField = null;
		this.$1$OnUserCreateField = null;
		this.$1$OnUserLoginField = null;
		this.$1$OnGetGameTypesField = null;
		this.$1$OnGetRoomsField = null;
		this.$1$OnGetRoomInfoField = null;
		this.$1$OnUserDisconnectField = null;
		this.$1$OnLeaveRoomField = null;
		this.$1$OnCreateRoomField = null;
		this.$1$OnJoinRoomField = null;
		this.$1$OnStartGameField = null;
		this.$1$OnGetGamesByUserField = null;
		this.set_siteServerIndex(siteServerIndex);
		this.$setup();
	};
	$ServerManager_SiteServer_SiteClientManager.prototype = {
		get_siteServerIndex: function() {
			return this.$1$SiteServerIndexField;
		},
		set_siteServerIndex: function(value) {
			this.$1$SiteServerIndexField = value;
		},
		add_onUserCreate: function(value) {
			this.$1$OnUserCreateField = ss.delegateCombine(this.$1$OnUserCreateField, value);
		},
		remove_onUserCreate: function(value) {
			this.$1$OnUserCreateField = ss.delegateRemove(this.$1$OnUserCreateField, value);
		},
		add_onUserLogin: function(value) {
			this.$1$OnUserLoginField = ss.delegateCombine(this.$1$OnUserLoginField, value);
		},
		remove_onUserLogin: function(value) {
			this.$1$OnUserLoginField = ss.delegateRemove(this.$1$OnUserLoginField, value);
		},
		add_onGetGameTypes: function(value) {
			this.$1$OnGetGameTypesField = ss.delegateCombine(this.$1$OnGetGameTypesField, value);
		},
		remove_onGetGameTypes: function(value) {
			this.$1$OnGetGameTypesField = ss.delegateRemove(this.$1$OnGetGameTypesField, value);
		},
		add_onGetRooms: function(value) {
			this.$1$OnGetRoomsField = ss.delegateCombine(this.$1$OnGetRoomsField, value);
		},
		remove_onGetRooms: function(value) {
			this.$1$OnGetRoomsField = ss.delegateRemove(this.$1$OnGetRoomsField, value);
		},
		add_onGetRoomInfo: function(value) {
			this.$1$OnGetRoomInfoField = ss.delegateCombine(this.$1$OnGetRoomInfoField, value);
		},
		remove_onGetRoomInfo: function(value) {
			this.$1$OnGetRoomInfoField = ss.delegateRemove(this.$1$OnGetRoomInfoField, value);
		},
		add_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateCombine(this.$1$OnUserDisconnectField, value);
		},
		remove_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = ss.delegateRemove(this.$1$OnUserDisconnectField, value);
		},
		add_onLeaveRoom: function(value) {
			this.$1$OnLeaveRoomField = ss.delegateCombine(this.$1$OnLeaveRoomField, value);
		},
		remove_onLeaveRoom: function(value) {
			this.$1$OnLeaveRoomField = ss.delegateRemove(this.$1$OnLeaveRoomField, value);
		},
		add_onCreateRoom: function(value) {
			this.$1$OnCreateRoomField = ss.delegateCombine(this.$1$OnCreateRoomField, value);
		},
		remove_onCreateRoom: function(value) {
			this.$1$OnCreateRoomField = ss.delegateRemove(this.$1$OnCreateRoomField, value);
		},
		add_onJoinRoom: function(value) {
			this.$1$OnJoinRoomField = ss.delegateCombine(this.$1$OnJoinRoomField, value);
		},
		remove_onJoinRoom: function(value) {
			this.$1$OnJoinRoomField = ss.delegateRemove(this.$1$OnJoinRoomField, value);
		},
		add_onStartGame: function(value) {
			this.$1$OnStartGameField = ss.delegateCombine(this.$1$OnStartGameField, value);
		},
		remove_onStartGame: function(value) {
			this.$1$OnStartGameField = ss.delegateRemove(this.$1$OnStartGameField, value);
		},
		add_onGetGamesByUser: function(value) {
			this.$1$OnGetGamesByUserField = ss.delegateCombine(this.$1$OnGetGamesByUserField, value);
		},
		remove_onGetGamesByUser: function(value) {
			this.$1$OnGetGamesByUserField = ss.delegateRemove(this.$1$OnGetGamesByUserField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_siteServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('SiteServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_siteServerIndex(), null)], ['ChatServer', 'GameServer', 'SiteServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Site.Login', ss.mkdel(this, function(user, data) {
				this.$1$OnUserLoginField(user, data);
			}));
			this.$qManager.addChannel('Area.Site.CreateUser', ss.mkdel(this, function(user1, data1) {
				this.$1$OnUserCreateField(user1, data1);
			}));
			this.$qManager.addChannel('Area.Site.GetGameTypes', ss.mkdel(this, function(user2, data2) {
				this.$1$OnGetGameTypesField(user2);
			}));
			this.$qManager.addChannel('Area.Site.GetRooms', ss.mkdel(this, function(user3, data3) {
				this.$1$OnGetRoomsField(user3, data3);
			}));
			this.$qManager.addChannel('Area.Site.GetRoomInfo', ss.mkdel(this, function(user4, data4) {
				this.$1$OnGetRoomInfoField(user4, data4);
			}));
			this.$qManager.addChannel('Area.Site.CreateRoom', ss.mkdel(this, function(user5, data5) {
				this.$1$OnCreateRoomField(user5, data5);
			}));
			this.$qManager.addChannel('Area.Site.LeaveRoom', ss.mkdel(this, function(user6, data6) {
				this.$1$OnLeaveRoomField(user6, data6);
			}));
			this.$qManager.addChannel('Area.Site.JoinRoom', ss.mkdel(this, function(user7, data7) {
				this.$1$OnJoinRoomField(user7, data7);
			}));
			this.$qManager.addChannel('Area.Site.StartGame', ss.mkdel(this, function(user8, data8) {
				this.$1$OnStartGameField(user8, data8);
			}));
			this.$qManager.addChannel('Area.Site.UserDisconnect', ss.mkdel(this, function(user9, data9) {
				this.$1$OnUserDisconnectField(user9, data9);
			}));
			this.$qManager.addChannel('Area.Site.GetGamesByUser', ss.mkdel(this, function(user10, data10) {
				this.$1$OnGetGamesByUserField(user10, data10);
			}));
		},
		sendLoginResponse: function(user, success) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.Login.Response', user, { successful: success });
		},
		sendCreateResponse: function(user, success) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.CreateUser.Response', user, { successful: success });
		},
		sendGameTypes: function(user, gameTypes) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.GetGameTypes.Response', user, gameTypes);
		},
		createChatRoom: function(user, roomRequest) {
			this.$qManager.sendMessage('ChatServer', 'Area.Chat.CreateChatRoom', user, roomRequest);
		},
		joinChatRoom: function(user, joinChatRoomRequest) {
			this.$qManager.sendMessage(joinChatRoomRequest.room.chatServer, 'Area.Chat.JoinChatRoom', user, joinChatRoomRequest);
		},
		sendRooms: function(user, response) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.GetRooms.Response', user, response);
		},
		sendRoomInfo: function(user, response) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.GetRoomInfo.Response', user, response);
		},
		roomJoined: function(user, roomJoinResponse) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.JoinRoom.Response', user, roomJoinResponse);
		},
		leaveChatRoom: function(user) {
			this.$qManager.sendMessage(user.currentChatServer, 'Area.Chat.LeaveChatRoom', user, null);
		},
		leaveGameRoom: function(user) {
			this.$qManager.sendMessage(user.currentGameServer, 'Area.Game.LeaveGameRoom', user, null);
		},
		createGame: function(gameCreateRequestModel) {
			this.$qManager.sendMessage('GameServer', 'Area.Game.Create', null, gameCreateRequestModel);
		},
		sendGamesByUser: function(user, getGamesByUserResponse) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.GetGamesByUser.Response', user, getGamesByUserResponse);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.SiteServer.SiteManager
	var $ServerManager_SiteServer_SiteManager = function(siteServerIndex) {
		this.$myDataManager = null;
		this.$mySiteClientManager = null;
		this.$myDataManager = new CommonShuffleLibrary.DataManager();
		this.$mySiteClientManager = new $ServerManager_SiteServer_SiteClientManager(siteServerIndex);
		this.$mySiteClientManager.add_onUserLogin(ss.mkdel(this, this.$onUserLogin));
		this.$mySiteClientManager.add_onUserCreate(ss.mkdel(this, this.$onUserCreate));
		this.$mySiteClientManager.add_onGetGameTypes(ss.mkdel(this, this.$onGetGameTypes));
		this.$mySiteClientManager.add_onGetRoomInfo(ss.mkdel(this, this.$onGetRoomInfo));
		this.$mySiteClientManager.add_onGetRooms(ss.mkdel(this, this.$onGetRooms));
		this.$mySiteClientManager.add_onCreateRoom(ss.mkdel(this, this.$onCreateRoom));
		this.$mySiteClientManager.add_onJoinRoom(ss.mkdel(this, this.$onJoinRoom));
		this.$mySiteClientManager.add_onLeaveRoom(ss.mkdel(this, this.$onLeaveRoom));
		this.$mySiteClientManager.add_onStartGame(ss.mkdel(this, this.$onStartGame));
		this.$mySiteClientManager.add_onGetGamesByUser(ss.mkdel(this, this.$onGetGamesByUser));
		this.$mySiteClientManager.add_onUserDisconnect(ss.mkdel(this, this.$onUserDisconnect));
	};
	$ServerManager_SiteServer_SiteManager.prototype = {
		$onLeaveRoom: function(user, data) {
			NodeLibraries.Common.Logging.Logger.log(user.userName + ' manual leave', 1);
			this.$removeUserFromRoom(user, function(room) {
			});
		},
		$onUserDisconnect: function(user, data) {
			NodeLibraries.Common.Logging.Logger.log(user.userName + ' disconnected', 1);
			this.$removeUserFromRoom(data.user, function(room) {
			});
		},
		$removeUserFromRoom: function(user, result) {
			NodeLibraries.Common.Logging.Logger.log(user.userName + ' removing', 1);
			this.$myDataManager.siteData.room_GetRoomByUser(user, ss.mkdel(this, function(room) {
				if (ss.isNullOrUndefined(room)) {
					result(null);
					return;
				}
				if (ss.isValue(user.currentChatServer)) {
					this.$mySiteClientManager.leaveChatRoom(user);
				}
				if (ss.isValue(user.currentGameServer)) {
					this.$mySiteClientManager.leaveGameRoom(user);
					NodeLibraries.Common.Logging.Logger.log(user.userName + ' left Game room', 1);
					user.currentGameServer = null;
				}
				for (var $t1 = 0; $t1 < room.players.length; $t1++) {
					var player = room.players[$t1];
					if (ss.referenceEquals(player.userName, user.userName)) {
						ss.remove(room.players, player);
					}
				}
				if (room.players.length === 0) {
					this.$myDataManager.siteData.room_DeleteRoom(room);
				}
				else {
					this.$myDataManager.siteData.room_RemovePlayer(room, user, ss.mkdel(this, function(ro) {
						for (var $t2 = 0; $t2 < room.players.length; $t2++) {
							var userLogicModel = room.players[$t2];
							this.$mySiteClientManager.sendRoomInfo(userLogicModel, { room: DataModels.SiteManagerModels.RoomDataModel.toModel(room) });
						}
					}));
				}
				result(DataModels.SiteManagerModels.RoomDataModel.toModel(room));
			}));
		},
		$onGetRooms: function(user, data) {
			this.$myDataManager.siteData.room_GetAllByGameType(data.gameType, ss.mkdel(this, function(a) {
				this.$mySiteClientManager.sendRooms(user, { rooms: a.map(function(b) {
					return DataModels.SiteManagerModels.RoomDataModel.toModel(b);
				}) });
			}));
		},
		$onStartGame: function(user, data) {
			//   Logger.Log("--game started 1 ", LogLevel.DebugInformation);
			this.$myDataManager.siteData.room_GetRoomByUser(user, ss.mkdel(this, function(room) {
				if (ss.isNullOrUndefined(room)) {
					throw new ss.Exception('idk');
				}
				//       Logger.Log("--game started 2", LogLevel.DebugInformation);
				this.$mySiteClientManager.createGame({ gameType: room.gameType, players: room.players });
			}));
		},
		$onGetRoomInfo: function(user, data) {
			this.$myDataManager.siteData.room_GetByRoomName(data.gameType, data.roomName, ss.mkdel(this, function(a) {
				this.$mySiteClientManager.sendRoomInfo(user, { room: DataModels.SiteManagerModels.RoomDataModel.toModel(a) });
			}));
		},
		$onCreateRoom: function(user, data) {
			NodeLibraries.Common.Logging.Logger.log(user.userName + ' create room', 1);
			this.$removeUserFromRoom(user, ss.mkdel(this, function(disconnectedRoom) {
				this.$myDataManager.siteData.room_CreateRoom(data.gameType, data.roomName, user, ss.mkdel(this, function(room) {
					this.$mySiteClientManager.createChatRoom(user, { room: DataModels.SiteManagerModels.RoomDataModel.toModel(room) });
					this.$mySiteClientManager.roomJoined(user, { room: DataModels.SiteManagerModels.RoomDataModel.toModel(room) });
					this.$myDataManager.siteData.room_GetAllByGameType(data.gameType, ss.mkdel(this, function(a) {
						this.$mySiteClientManager.sendRooms(user, { rooms: a.map(function(b) {
							return DataModels.SiteManagerModels.RoomDataModel.toModel(b);
						}) });
					}));
				}));
			}));
		},
		$onJoinRoom: function(user, data) {
			NodeLibraries.Common.Logging.Logger.log(user.userName + ' join room', 1);
			this.$removeUserFromRoom(user, ss.mkdel(this, function(disconnectedRoom) {
				this.$myDataManager.siteData.room_JoinRoom(data.gameType, data.roomName, user, ss.mkdel(this, function(room) {
					this.$mySiteClientManager.roomJoined(user, { room: DataModels.SiteManagerModels.RoomDataModel.toModel(room) });
					this.$mySiteClientManager.joinChatRoom(user, { room: DataModels.SiteManagerModels.RoomDataModel.toModel(room) });
					for (var $t1 = 0; $t1 < room.players.length; $t1++) {
						var UserLogicModel = room.players[$t1];
						this.$mySiteClientManager.sendRoomInfo(UserLogicModel, { room: DataModels.SiteManagerModels.RoomDataModel.toModel(room) });
					}
				}));
			}));
		},
		$onGetGameTypes: function(user) {
			var $t1 = [];
			ss.add($t1, { name: 'Blackjack' });
			ss.add($t1, { name: 'Sevens' });
			var types = $t1;
			this.$mySiteClientManager.sendGameTypes(user, { gameTypes: types });
		},
		$onUserLogin: function(user, data) {
			this.$myDataManager.siteData.user_GetFirstByUsernamePassword(user.userName, user.password, ss.mkdel(this, function(users) {
				this.$mySiteClientManager.sendLoginResponse(user, users.length !== 0);
			}));
		},
		$onUserCreate: function(user, data) {
			this.$myDataManager.siteData.user_CheckUsernameExists(data.userName, ss.mkdel(this, function(exists) {
				if (!exists) {
					var $t2 = this.$myDataManager.siteData;
					var $t1 = DataModels.SiteManagerModels.UserModelData.$ctor();
					$t1.username = data.userName;
					$t1.password = data.password;
					$t2.user_Insert($t1, ss.mkdel(this, function() {
						this.$mySiteClientManager.sendLoginResponse(user, true);
					}));
				}
				else {
					this.$mySiteClientManager.sendLoginResponse(user, false);
				}
			}));
		},
		$onGetGamesByUser: function(user, data) {
			this.$myDataManager.siteData.game_GetGamesByUser(data.userHash, ss.mkdel(this, function(games) {
				this.$mySiteClientManager.sendGamesByUser(user, { games: games.map(function(a) {
					return DataModels.SiteManagerModels.Game.GameDataModel.toModel(a);
				}) });
			}));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ServerManager.SiteServer.SiteServer
	var $ServerManager_SiteServer_SiteServer = function() {
		this.$siteServerIndex = null;
		new global.ArrayUtils();
		this.$siteServerIndex = 'SiteServer' + CommonLibraries.Guid.newGuid();
		NodeLibraries.Common.Logging.Logger.start(this.$siteServerIndex);
		process.on('exit', function() {
			NodeLibraries.Common.Logging.Logger.log('exi SiteServer', 2);
		});
		var siteManager = new $ServerManager_SiteServer_SiteManager(this.$siteServerIndex);
	};
	ss.registerClass(null, 'ServerManager.$ServerManager', $ServerManager_$ServerManager);
	ss.registerClass(global, 'ServerManager.AdminServer.AdminServer', $ServerManager_AdminServer_AdminServer);
	ss.registerClass(global, 'ServerManager.AdminServer.ProcessInformation', $ServerManager_AdminServer_ProcessInformation);
	ss.registerClass(global, 'ServerManager.ChatServer.ChatClientManager', $ServerManager_ChatServer_ChatClientManager);
	ss.registerClass(global, 'ServerManager.ChatServer.ChatManager', $ServerManager_ChatServer_ChatManager);
	ss.registerClass(global, 'ServerManager.ChatServer.ChatServer', $ServerManager_ChatServer_ChatServer);
	ss.registerClass(global, 'ServerManager.DebugServer.DebugServer', $ServerManager_DebugServer_DebugServer);
	ss.registerClass(global, 'ServerManager.GameServer.GameClientManager', $ServerManager_GameServer_GameClientManager);
	ss.registerClass(global, 'ServerManager.GameServer.GameData', $ServerManager_GameServer_GameData);
	ss.registerClass(global, 'ServerManager.GameServer.GameManager', $ServerManager_GameServer_GameManager);
	ss.registerClass(global, 'ServerManager.GameServer.GameServer', $ServerManager_GameServer_GameServer);
	ss.registerClass(global, 'ServerManager.GameServer.Models.FiberYieldResponse', $ServerManager_GameServer_Models_FiberYieldResponse);
	ss.registerClass(global, 'ServerManager.GameServer.Models.GameQuestionAnswerModel', $ServerManager_GameServer_Models_GameQuestionAnswerModel);
	ss.registerClass(global, 'ServerManager.GameServer.Models.GameRoom', $ServerManager_GameServer_Models_GameRoom);
	ss.registerClass(global, 'ServerManager.GatewayServer.GatewayServer', $ServerManager_GatewayServer_GatewayServer);
	ss.registerClass(global, 'ServerManager.HeadServer.HeadServer', $ServerManager_HeadServer_HeadServer);
	ss.registerClass(global, 'ServerManager.MonitorServer.MonitorServer', $ServerManager_MonitorServer_MonitorServer);
	ss.registerClass(global, 'ServerManager.SiteServer.SiteClientManager', $ServerManager_SiteServer_SiteClientManager);
	ss.registerClass(global, 'ServerManager.SiteServer.SiteManager', $ServerManager_SiteServer_SiteManager);
	ss.registerClass(global, 'ServerManager.SiteServer.SiteServer', $ServerManager_SiteServer_SiteServer);
	$ServerManager_$ServerManager.$main();
})();
