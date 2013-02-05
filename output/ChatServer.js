require('./mscorlib.js');require('./MongoDBLibrary.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');require('./RawDeflate.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// ChatServer.ChatClientManager
	var $ChatServer_ChatClientManager = function(chatServerIndex) {
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
	$ChatServer_ChatClientManager.prototype = {
		get_chatServerIndex: function() {
			return this.$1$ChatServerIndexField;
		},
		set_chatServerIndex: function(value) {
			this.$1$ChatServerIndexField = value;
		},
		add_onCreateChatChannel: function(value) {
			this.$1$OnCreateChatChannelField = Function.combine(this.$1$OnCreateChatChannelField, value);
		},
		remove_onCreateChatChannel: function(value) {
			this.$1$OnCreateChatChannelField = Function.remove(this.$1$OnCreateChatChannelField, value);
		},
		add_onSendMessage: function(value) {
			this.$1$OnSendMessageField = Function.combine(this.$1$OnSendMessageField, value);
		},
		remove_onSendMessage: function(value) {
			this.$1$OnSendMessageField = Function.remove(this.$1$OnSendMessageField, value);
		},
		add_onJoinChatChannel: function(value) {
			this.$1$OnJoinChatChannelField = Function.combine(this.$1$OnJoinChatChannelField, value);
		},
		remove_onJoinChatChannel: function(value) {
			this.$1$OnJoinChatChannelField = Function.remove(this.$1$OnJoinChatChannelField, value);
		},
		add_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = Function.combine(this.$1$OnUserDisconnectField, value);
		},
		remove_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = Function.remove(this.$1$OnUserDisconnectField, value);
		},
		add_onLeaveChatRoom: function(value) {
			this.$1$OnLeaveChatRoomField = Function.combine(this.$1$OnLeaveChatRoomField, value);
		},
		remove_onLeaveChatRoom: function(value) {
			this.$1$OnLeaveChatRoomField = Function.remove(this.$1$OnLeaveChatRoomField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_chatServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('ChatServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_chatServerIndex(), null)], ['ChatServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Chat.CreateChatRoom', Function.mkdel(this, function(user, data) {
				this.$1$OnCreateChatChannelField(user, data);
			}));
			this.$qManager.addChannel('Area.Chat.JoinChatRoom', Function.mkdel(this, function(user1, data1) {
				this.$1$OnJoinChatChannelField(user1, data1);
			}));
			this.$qManager.addChannel('Area.Chat.SendMessage', Function.mkdel(this, function(user2, data2) {
				this.$1$OnSendMessageField(user2, data2);
			}));
			this.$qManager.addChannel('Area.Chat.UserDisconnect', Function.mkdel(this, function(user3, data3) {
				this.$1$OnUserDisconnectField(user3, data3);
			}));
			this.$qManager.addChannel('Area.Chat.LeaveChatRoom', Function.mkdel(this, function(user4, data4) {
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
	// ChatServer.ChatManager
	var $ChatServer_ChatManager = function(chatServerIndex) {
		this.$myDataManager = null;
		this.$myServerManager = null;
		this.$runningRooms = [];
		this.$myDataManager = new CommonShuffleLibrary.DataManager();
		this.$myServerManager = new $ChatServer_ChatClientManager(chatServerIndex);
		this.$myServerManager.add_onCreateChatChannel(Function.mkdel(this, this.$onCreateChatChannel));
		this.$myServerManager.add_onJoinChatChannel(Function.mkdel(this, this.$onJoinChatChannel));
		this.$myServerManager.add_onSendMessage(Function.mkdel(this, this.$onSendMessage));
		this.$myServerManager.add_onLeaveChatRoom(Function.mkdel(this, this.$onLeaveChatRoom));
		this.$myServerManager.add_onUserDisconnect(Function.mkdel(this, this.$onUserDisconnect));
	};
	$ChatServer_ChatManager.prototype = {
		$onLeaveChatRoom: function(user) {
			this.$leaveChatRoom(user);
		},
		$leaveChatRoom: function(user) {
			debugger;
			var room = this.$getRoomFromUser(user);
			if (ss.isNullOrUndefined(room)) {
				throw new ss.Exception('idk');
			}
			for (var $t1 = 0; $t1 < room.users.length; $t1++) {
				var userLogicModel = room.users[$t1];
				if (ss.referenceEquals(userLogicModel.hash, user.hash)) {
					room.users.remove(userLogicModel);
					break;
				}
			}
			this.$myDataManager.chatData.removeUser(room, user, Function.mkdel(this, function(a) {
				this.$myServerManager.unregisterChatServer(user);
				var roomToSend = { roomName: room.roomName, users: room.users, messages: null };
				for (var $t2 = 0; $t2 < room.users.length; $t2++) {
					var userLogicModel1 = room.users[$t2];
					this.$myServerManager.sendChatInfo(userLogicModel1, roomToSend);
				}
			}));
		},
		$onSendMessage: function(user, data) {
			var room = this.$getRoomFromUser(user);
			if (ss.isNullOrUndefined(room)) {
				throw new ss.Exception('idk');
			}
			this.$myDataManager.chatData.addChatLine(user, room, data.message, Function.mkdel(this, function(a) {
				for (var $t1 = 0; $t1 < room.users.length; $t1++) {
					var userLogicModel = room.users[$t1];
					var $t3 = this.$myServerManager;
					var $t2 = [];
					$t2.add(a);
					$t3.sendChatLines(userLogicModel, { messages: $t2 });
				}
			}));
		},
		$getRoomFromUser: function(user) {
			var currentRoom = null;
			for (var $t1 = 0; $t1 < this.$runningRooms.length; $t1++) {
				var chatRoomModel = this.$runningRooms[$t1];
				for (var $t2 = 0; $t2 < chatRoomModel.users.length; $t2++) {
					var item = chatRoomModel.users[$t2];
					if (ss.referenceEquals(item.userName, user.userName)) {
						currentRoom = chatRoomModel;
					}
				}
			}
			return currentRoom;
		},
		$onJoinChatChannel: function(user, data) {
			var cur = this.$getRoomFromUser(user);
			if (ss.isValue(cur)) {
				this.$leaveChatRoom(user);
			}
			var currentRoom = null;
			for (var $t1 = 0; $t1 < this.$runningRooms.length; $t1++) {
				var chatRoomModel = this.$runningRooms[$t1];
				if (ss.referenceEquals(chatRoomModel.roomName, data.room.chatChannel)) {
					currentRoom = chatRoomModel;
				}
			}
			if (ss.isNullOrUndefined(currentRoom)) {
				throw new ss.Exception('idk');
			}
			this.$myDataManager.chatData.addUser(currentRoom, user, Function.mkdel(this, function(room) {
				this.$myServerManager.registerChatServer(user);
				var roomToSend = { roomName: room.roomName, users: room.users, messages: room.messages };
				roomToSend.messages = room.messages.extract(room.messages.length - 5);
				this.$myServerManager.sendChatInfo(user, roomToSend);
				roomToSend = { roomName: room.roomName, users: room.users, messages: null };
				for (var $t2 = 0; $t2 < currentRoom.users.length; $t2++) {
					var userLogicModel = currentRoom.users[$t2];
					this.$myServerManager.sendChatInfo(userLogicModel, roomToSend);
				}
			}));
		},
		$onCreateChatChannel: function(user, data) {
			var cur = this.$getRoomFromUser(user);
			if (ss.isValue(cur)) {
				this.$leaveChatRoom(user);
			}
			this.$myDataManager.siteData.room_SetChatServer(data.room, this.$myServerManager.get_chatServerIndex(), Function.mkdel(this, function(r) {
				this.$myDataManager.chatData.createChatChannel(data.room.chatChannel, user, Function.mkdel(this, function(a) {
					this.$myServerManager.registerChatServer(user);
					this.$runningRooms.add(a);
					this.$myServerManager.sendChatInfo(user, a);
				}));
			}));
		},
		$onUserDisconnect: function(user, data) {
			console.log('Awww, dat ' + user.userName + ' disconnected');
			this.$myServerManager.unregisterChatServer(user);
			this.$leaveChatRoom(user);
			//removeUserFromRoom(data.User, (room) => { });
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ChatServer.ChatServer
	var $ChatServer_ChatServer = function() {
		this.$chatServerIndex = null;
		new global.ArrayUtils();
		this.$chatServerIndex = 'ChatServer' + CommonLibraries.Guid.newGuid();
		process.on('exit', function() {
			console.log('exi ChatServer');
		});
		var chatManager = new $ChatServer_ChatManager(this.$chatServerIndex);
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
	Type.registerClass(global, 'ChatServer.ChatClientManager', $ChatServer_ChatClientManager, Object);
	Type.registerClass(global, 'ChatServer.ChatManager', $ChatServer_ChatManager, Object);
	Type.registerClass(global, 'ChatServer.ChatServer', $ChatServer_ChatServer, Object);
	$ChatServer_ChatServer.main();
})();
