require('./mscorlib.js');require('./MongoDBLibrary.js');require('./CommonLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');require('./RawDeflate.js');
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// SiteServer.SiteClientManager
	var $SiteServer_SiteClientManager = function(siteServerIndex) {
		this.$qManager = null;
		this.$1$SiteServerIndexField = null;
		this.$1$OnUserLoginField = null;
		this.$1$OnGetGameTypesField = null;
		this.$1$OnGetRoomsField = null;
		this.$1$OnGetRoomInfoField = null;
		this.$1$OnUserDisconnectField = null;
		this.$1$OnLeaveRoomField = null;
		this.$1$OnCreateRoomField = null;
		this.$1$OnJoinRoomField = null;
		this.$1$OnStartGameField = null;
		this.set_siteServerIndex(siteServerIndex);
		this.$setup();
	};
	$SiteServer_SiteClientManager.prototype = {
		get_siteServerIndex: function() {
			return this.$1$SiteServerIndexField;
		},
		set_siteServerIndex: function(value) {
			this.$1$SiteServerIndexField = value;
		},
		add_onUserLogin: function(value) {
			this.$1$OnUserLoginField = Function.combine(this.$1$OnUserLoginField, value);
		},
		remove_onUserLogin: function(value) {
			this.$1$OnUserLoginField = Function.remove(this.$1$OnUserLoginField, value);
		},
		add_onGetGameTypes: function(value) {
			this.$1$OnGetGameTypesField = Function.combine(this.$1$OnGetGameTypesField, value);
		},
		remove_onGetGameTypes: function(value) {
			this.$1$OnGetGameTypesField = Function.remove(this.$1$OnGetGameTypesField, value);
		},
		add_onGetRooms: function(value) {
			this.$1$OnGetRoomsField = Function.combine(this.$1$OnGetRoomsField, value);
		},
		remove_onGetRooms: function(value) {
			this.$1$OnGetRoomsField = Function.remove(this.$1$OnGetRoomsField, value);
		},
		add_onGetRoomInfo: function(value) {
			this.$1$OnGetRoomInfoField = Function.combine(this.$1$OnGetRoomInfoField, value);
		},
		remove_onGetRoomInfo: function(value) {
			this.$1$OnGetRoomInfoField = Function.remove(this.$1$OnGetRoomInfoField, value);
		},
		add_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = Function.combine(this.$1$OnUserDisconnectField, value);
		},
		remove_onUserDisconnect: function(value) {
			this.$1$OnUserDisconnectField = Function.remove(this.$1$OnUserDisconnectField, value);
		},
		add_onLeaveRoom: function(value) {
			this.$1$OnLeaveRoomField = Function.combine(this.$1$OnLeaveRoomField, value);
		},
		remove_onLeaveRoom: function(value) {
			this.$1$OnLeaveRoomField = Function.remove(this.$1$OnLeaveRoomField, value);
		},
		add_onCreateRoom: function(value) {
			this.$1$OnCreateRoomField = Function.combine(this.$1$OnCreateRoomField, value);
		},
		remove_onCreateRoom: function(value) {
			this.$1$OnCreateRoomField = Function.remove(this.$1$OnCreateRoomField, value);
		},
		add_onJoinRoom: function(value) {
			this.$1$OnJoinRoomField = Function.combine(this.$1$OnJoinRoomField, value);
		},
		remove_onJoinRoom: function(value) {
			this.$1$OnJoinRoomField = Function.remove(this.$1$OnJoinRoomField, value);
		},
		add_onStartGame: function(value) {
			this.$1$OnStartGameField = Function.combine(this.$1$OnStartGameField, value);
		},
		remove_onStartGame: function(value) {
			this.$1$OnStartGameField = Function.remove(this.$1$OnStartGameField, value);
		},
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_siteServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('SiteServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_siteServerIndex(), null)], ['ChatServer', 'GameServer', 'SiteServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Site.Login', Function.mkdel(this, function(user, data) {
				this.$1$OnUserLoginField(user, data);
			}));
			this.$qManager.addChannel('Area.Site.GetGameTypes', Function.mkdel(this, function(user1, data1) {
				this.$1$OnGetGameTypesField(user1);
			}));
			this.$qManager.addChannel('Area.Site.GetRooms', Function.mkdel(this, function(user2, data2) {
				this.$1$OnGetRoomsField(user2, data2);
			}));
			this.$qManager.addChannel('Area.Site.GetRoomInfo', Function.mkdel(this, function(user3, data3) {
				this.$1$OnGetRoomInfoField(user3, data3);
			}));
			this.$qManager.addChannel('Area.Site.CreateRoom', Function.mkdel(this, function(user4, data4) {
				this.$1$OnCreateRoomField(user4, data4);
			}));
			this.$qManager.addChannel('Area.Site.LeaveRoom', Function.mkdel(this, function(user5, data5) {
				this.$1$OnLeaveRoomField(user5, data5);
			}));
			this.$qManager.addChannel('Area.Site.JoinRoom', Function.mkdel(this, function(user6, data6) {
				this.$1$OnJoinRoomField(user6, data6);
			}));
			this.$qManager.addChannel('Area.Site.StartGame', Function.mkdel(this, function(user7, data7) {
				this.$1$OnStartGameField(user7, data7);
			}));
			this.$qManager.addChannel('Area.Site.UserDisconnect', Function.mkdel(this, function(user8, data8) {
				this.$1$OnUserDisconnectField(user8, data8);
			}));
		},
		sendLoginResponse: function(user) {
			this.$qManager.sendMessage(user.gateway, 'Area.Site.Login.Response', user, { successful: true });
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
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// SiteServer.SiteManager
	var $SiteServer_SiteManager = function(siteServerIndex) {
		this.$myDataManager = null;
		this.$mySiteClientManager = null;
		this.$myDataManager = new CommonShuffleLibrary.DataManager();
		this.$mySiteClientManager = new $SiteServer_SiteClientManager(siteServerIndex);
		this.$mySiteClientManager.add_onUserLogin(Function.mkdel(this, this.$onUserLogin));
		this.$mySiteClientManager.add_onGetGameTypes(Function.mkdel(this, this.$onGetGameTypes));
		this.$mySiteClientManager.add_onGetRoomInfo(Function.mkdel(this, this.$onGetRoomInfo));
		this.$mySiteClientManager.add_onGetRooms(Function.mkdel(this, this.$onGetRooms));
		this.$mySiteClientManager.add_onCreateRoom(Function.mkdel(this, this.$onCreateRoom));
		this.$mySiteClientManager.add_onJoinRoom(Function.mkdel(this, this.$onJoinRoom));
		this.$mySiteClientManager.add_onLeaveRoom(Function.mkdel(this, this.$onLeaveRoom));
		this.$mySiteClientManager.add_onStartGame(Function.mkdel(this, this.$onStartGame));
		this.$mySiteClientManager.add_onUserDisconnect(Function.mkdel(this, this.$onUserDisconnect));
	};
	$SiteServer_SiteManager.prototype = {
		$onLeaveRoom: function(user, data) {
			this.$removeUserFromRoom(user, function(room) {
			});
		},
		$onUserDisconnect: function(user, data) {
			console.log(user.userName + ' disconnected');
			this.$removeUserFromRoom(data.user, function(room) {
			});
		},
		$removeUserFromRoom: function(user, result) {
			this.$myDataManager.siteData.room_GetRoomByUser(user, Function.mkdel(this, function(room) {
				if (ss.isNullOrUndefined(room)) {
					result(null);
					return;
				}
				this.$mySiteClientManager.leaveChatRoom(user);
				this.$mySiteClientManager.leaveGameRoom(user);
				for (var $t1 = 0; $t1 < room.players.length; $t1++) {
					var player = room.players[$t1];
					if (ss.referenceEquals(player.userName, user.userName)) {
						room.players.remove(player);
					}
				}
				if (room.players.length === 0) {
					this.$myDataManager.siteData.room_DeleteRoom(room);
				}
				else {
					this.$myDataManager.siteData.room_RemovePlayer(room, user, Function.mkdel(this, function(ro) {
						for (var $t2 = 0; $t2 < room.players.length; $t2++) {
							var userLogicModel = room.players[$t2];
							this.$mySiteClientManager.sendRoomInfo(userLogicModel, { room: room });
						}
					}));
				}
				result(room);
			}));
		},
		$onGetRooms: function(user, data) {
			this.$myDataManager.siteData.room_GetAllByGameType(data.gameType, Function.mkdel(this, function(a) {
				this.$mySiteClientManager.sendRooms(user, { rooms: a });
			}));
		},
		$onStartGame: function(user, data) {
			console.log('--game started 1 ');
			this.$myDataManager.siteData.room_GetRoomByUser(user, Function.mkdel(this, function(room) {
				if (ss.isNullOrUndefined(room)) {
					throw new ss.Exception('idk');
					return;
				}
				console.log('--game started 2');
				this.$mySiteClientManager.createGame({ gameType: room.gameType, players: room.players });
			}));
		},
		$onGetRoomInfo: function(user, data) {
			this.$myDataManager.siteData.room_GetByRoomName(data.gameType, data.roomName, Function.mkdel(this, function(a) {
				this.$mySiteClientManager.sendRoomInfo(user, { room: a });
			}));
		},
		$onCreateRoom: function(user, data) {
			this.$removeUserFromRoom(user, Function.mkdel(this, function(disconnectedRoom) {
				this.$myDataManager.siteData.room_CreateRoom(data.gameType, data.roomName, user, Function.mkdel(this, function(room) {
					this.$mySiteClientManager.createChatRoom(user, { room: room });
					this.$mySiteClientManager.roomJoined(user, { room: room });
					this.$myDataManager.siteData.room_GetAllByGameType(data.gameType, Function.mkdel(this, function(a) {
						this.$mySiteClientManager.sendRooms(user, { rooms: a });
					}));
				}));
			}));
		},
		$onJoinRoom: function(user, data) {
			this.$removeUserFromRoom(user, Function.mkdel(this, function(disconnectedRoom) {
				this.$myDataManager.siteData.room_JoinRoom(data.gameType, data.roomName, user, Function.mkdel(this, function(room) {
					this.$mySiteClientManager.roomJoined(user, { room: room });
					this.$mySiteClientManager.joinChatRoom(user, { room: room });
					for (var $t1 = 0; $t1 < room.players.length; $t1++) {
						var UserLogicModel = room.players[$t1];
						this.$mySiteClientManager.sendRoomInfo(UserLogicModel, { room: room });
					}
				}));
			}));
		},
		$onGetGameTypes: function(user) {
			var $t1 = [];
			$t1.add({ name: 'Blackjack' });
			$t1.add({ name: 'Sevens' });
			var types = $t1;
			this.$mySiteClientManager.sendGameTypes(user, { gameTypes: types });
		},
		$onUserLogin: function(user, data) {
			this.$mySiteClientManager.sendLoginResponse(user);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// SiteServer.SiteServer
	var $SiteServer_SiteServer = function() {
		this.$siteServerIndex = null;
		new global.ArrayUtils();
		this.$siteServerIndex = 'SiteServer' + CommonLibraries.Guid.newGuid();
		process.on('exit', function() {
			console.log('exi SiteServer');
		});
		var siteManager = new $SiteServer_SiteManager(this.$siteServerIndex);
	};
	$SiteServer_SiteServer.main = function() {
		try {
			new $SiteServer_SiteServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			console.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc));
		}
	};
	Type.registerClass(global, 'SiteServer.SiteClientManager', $SiteServer_SiteClientManager, Object);
	Type.registerClass(global, 'SiteServer.SiteManager', $SiteServer_SiteManager, Object);
	Type.registerClass(global, 'SiteServer.SiteServer', $SiteServer_SiteServer, Object);
	$SiteServer_SiteServer.main();
})();
