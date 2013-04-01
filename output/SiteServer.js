require('./mscorlib.js');EventEmitter= require('events.js').EventEmitter;require('./NodeLibraries.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./CommonShuffleLibrary.js');require('./ShuffleGameLibrary.js');require('./Models.js');require('./RawDeflate.js');
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
		$setup: function() {
			this.$qManager = new CommonShuffleLibrary.QueueManager(this.get_siteServerIndex(), new CommonShuffleLibrary.QueueManagerOptions([new CommonShuffleLibrary.QueueWatcher('SiteServer', null), new CommonShuffleLibrary.QueueWatcher(this.get_siteServerIndex(), null)], ['ChatServer', 'GameServer', 'SiteServer', 'GatewayServer', 'Gateway*']));
			this.$qManager.addChannel('Area.Site.Login', ss.mkdel(this, function(user, data) {
				this.$1$OnUserLoginField(user, data);
			}));
			this.$qManager.addChannel('Area.Site.GetGameTypes', ss.mkdel(this, function(user1, data1) {
				this.$1$OnGetGameTypesField(user1);
			}));
			this.$qManager.addChannel('Area.Site.GetRooms', ss.mkdel(this, function(user2, data2) {
				this.$1$OnGetRoomsField(user2, data2);
			}));
			this.$qManager.addChannel('Area.Site.GetRoomInfo', ss.mkdel(this, function(user3, data3) {
				this.$1$OnGetRoomInfoField(user3, data3);
			}));
			this.$qManager.addChannel('Area.Site.CreateRoom', ss.mkdel(this, function(user4, data4) {
				this.$1$OnCreateRoomField(user4, data4);
			}));
			this.$qManager.addChannel('Area.Site.LeaveRoom', ss.mkdel(this, function(user5, data5) {
				this.$1$OnLeaveRoomField(user5, data5);
			}));
			this.$qManager.addChannel('Area.Site.JoinRoom', ss.mkdel(this, function(user6, data6) {
				this.$1$OnJoinRoomField(user6, data6);
			}));
			this.$qManager.addChannel('Area.Site.StartGame', ss.mkdel(this, function(user7, data7) {
				this.$1$OnStartGameField(user7, data7);
			}));
			this.$qManager.addChannel('Area.Site.UserDisconnect', ss.mkdel(this, function(user8, data8) {
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
		this.$mySiteClientManager.add_onUserLogin(ss.mkdel(this, this.$onUserLogin));
		this.$mySiteClientManager.add_onGetGameTypes(ss.mkdel(this, this.$onGetGameTypes));
		this.$mySiteClientManager.add_onGetRoomInfo(ss.mkdel(this, this.$onGetRoomInfo));
		this.$mySiteClientManager.add_onGetRooms(ss.mkdel(this, this.$onGetRooms));
		this.$mySiteClientManager.add_onCreateRoom(ss.mkdel(this, this.$onCreateRoom));
		this.$mySiteClientManager.add_onJoinRoom(ss.mkdel(this, this.$onJoinRoom));
		this.$mySiteClientManager.add_onLeaveRoom(ss.mkdel(this, this.$onLeaveRoom));
		this.$mySiteClientManager.add_onStartGame(ss.mkdel(this, this.$onStartGame));
		this.$mySiteClientManager.add_onUserDisconnect(ss.mkdel(this, this.$onUserDisconnect));
	};
	$SiteServer_SiteManager.prototype = {
		$onLeaveRoom: function(user, data) {
			CommonServerLibraries.Logger.log(user.userName + ' manual leave', 1);
			this.$removeUserFromRoom(user, function(room) {
			});
		},
		$onUserDisconnect: function(user, data) {
			CommonServerLibraries.Logger.log(user.userName + ' disconnected', 1);
			this.$removeUserFromRoom(data.user, function(room) {
			});
		},
		$removeUserFromRoom: function(user, result) {
			CommonServerLibraries.Logger.log(user.userName + ' removing', 1);
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
					CommonServerLibraries.Logger.log(user.userName + ' left Game room', 1);
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
							this.$mySiteClientManager.sendRoomInfo(userLogicModel, { room: room });
						}
					}));
				}
				result(room);
			}));
		},
		$onGetRooms: function(user, data) {
			this.$myDataManager.siteData.room_GetAllByGameType(data.gameType, ss.mkdel(this, function(a) {
				this.$mySiteClientManager.sendRooms(user, { rooms: a });
			}));
		},
		$onStartGame: function(user, data) {
			//   Logger.Log("--game started 1 ", LogLevel.DebugInformation);
			this.$myDataManager.siteData.room_GetRoomByUser(user, ss.mkdel(this, function(room) {
				if (ss.isNullOrUndefined(room)) {
					throw new ss.Exception('idk');
					return;
				}
				//       Logger.Log("--game started 2", LogLevel.DebugInformation);
				this.$mySiteClientManager.createGame({ gameType: room.gameType, players: room.players });
			}));
		},
		$onGetRoomInfo: function(user, data) {
			this.$myDataManager.siteData.room_GetByRoomName(data.gameType, data.roomName, ss.mkdel(this, function(a) {
				this.$mySiteClientManager.sendRoomInfo(user, { room: a });
			}));
		},
		$onCreateRoom: function(user, data) {
			CommonServerLibraries.Logger.log(user.userName + ' create room', 1);
			this.$removeUserFromRoom(user, ss.mkdel(this, function(disconnectedRoom) {
				this.$myDataManager.siteData.room_CreateRoom(data.gameType, data.roomName, user, ss.mkdel(this, function(room) {
					this.$mySiteClientManager.createChatRoom(user, { room: room });
					this.$mySiteClientManager.roomJoined(user, { room: room });
					this.$myDataManager.siteData.room_GetAllByGameType(data.gameType, ss.mkdel(this, function(a) {
						this.$mySiteClientManager.sendRooms(user, { rooms: a });
					}));
				}));
			}));
		},
		$onJoinRoom: function(user, data) {
			CommonServerLibraries.Logger.log(user.userName + ' join room', 1);
			this.$removeUserFromRoom(user, ss.mkdel(this, function(disconnectedRoom) {
				this.$myDataManager.siteData.room_JoinRoom(data.gameType, data.roomName, user, ss.mkdel(this, function(room) {
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
			ss.add($t1, { name: 'Blackjack' });
			ss.add($t1, { name: 'Sevens' });
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
		CommonServerLibraries.Logger.start(this.$siteServerIndex);
		process.on('exit', function() {
			CommonServerLibraries.Logger.log('exi SiteServer', 2);
		});
		var siteManager = new $SiteServer_SiteManager(this.$siteServerIndex);
	};
	$SiteServer_SiteServer.main = function() {
		try {
			new $SiteServer_SiteServer();
		}
		catch ($t1) {
			var exc = ss.Exception.wrap($t1);
			CommonServerLibraries.Logger.log('CRITICAL FAILURE: ' + CommonLibraries.ExtensionMethods.goodMessage(exc), 0);
		}
	};
	ss.registerClass(global, 'SiteServer.SiteClientManager', $SiteServer_SiteClientManager);
	ss.registerClass(global, 'SiteServer.SiteManager', $SiteServer_SiteManager);
	ss.registerClass(global, 'SiteServer.SiteServer', $SiteServer_SiteServer);
	$SiteServer_SiteServer.main();
})();
